import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import {
	createCompletedHabitsTable,
	deleteCompletedHabitsByHabitIdDB,
	getAllCompletedHabitsDB,
	getCompletedHabitByHabitIdDB,
	migrateCompletedDataFromAsyncStorageToSQLite,
	saveCompletedHabitDB,
	updateCompletedHabitDB,
} from "@/services/db/completedHabitsDb";
import {
	createHabitsTable,
	deleteHabitByIdDB,
	getAllHabits,
	getHabitByIdDB,
	migrateDataFromAsyncStorageToSQLite,
	saveHabitDB,
	updateHabitDB,
} from "@/services/db/habitsDb";
import {
	CompletedDay,
	Habit,
	HabitCompletion,
	HabitContextType,
} from "@/types/habit";
import { randomUUID } from "expo-crypto";
import {
	cancelScheduledNotificationAsync,
	getAllScheduledNotificationsAsync,
	scheduleNotificationAsync,
} from "expo-notifications";
import * as SQLite from "expo-sqlite";
import { t } from "i18next";
import moment from "moment";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	createCompletedDaysTable,
	getAllCompletedDaysDB,
	getCompletedDayByDateDB,
	saveCompletedDayDB,
} from "../db/completedDayDB";

export const HabitContext = createContext<HabitContextType>({
	habits: [],
	addHabit: async (newHabit: Habit) => false,
	updateHabit: async (habitId: string, updatedHabit: Habit) => false,
	removeHabit: (habitId: string) => {},
	completedHabits: [],
	markHabitAsCompleted: (habitId: string) => {},
	completedDays: [],
});

export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
	const [habits, setHabits] = useState<Habit[]>([]);
	const [completedHabits, setCompletedHabits] = useState<HabitCompletion[]>([]);
	const [completedDays, setCompletedDays] = useState<CompletedDay[]>([]);

	const db = SQLite.openDatabase("habitDevelop.db");

	useEffect(() => {
		(async () => {
			migrateDataFromAsyncStorageToSQLite(db);
			migrateCompletedDataFromAsyncStorageToSQLite(db);
			try {
				createHabitsTable(db);
				createCompletedHabitsTable(db);
				createCompletedDaysTable(db);

				//Habits
				const getHabits = await getAllHabits(db);

				if (getHabits !== null) {
					setHabits(getHabits);
				}

				//Complete habits
				const getCompletedHabits = await getAllCompletedHabitsDB(db);
				if (getCompletedHabits !== null) {
					setCompletedHabits(getCompletedHabits);
				}
				// console.log(getCompletedHabits.length);

				// console.log(getCompletedHabits[0].id);
				// deleteCompletedHabitsByHabitIdDB(db, getCompletedHabits[0].habitId);

				const getCompletedDay = await getAllCompletedDaysDB(db);
				if (getCompletedDay !== null) {
					setCompletedDays(getCompletedDay);
				}

				// deleteAllCompletedDays(db);

				//Get Level
			} catch (error) {}
		})();
	}, []);

	useUpdateEffect(() => {
		(async () => {
			const allHabitsCompleted = checkIfAllHabitsCompleted(
				habits,
				completedHabits,
			);

			if (habits.length > 0) {
				if (allHabitsCompleted) {
					const completedDay = {
						id: randomUUID(),
						date: new Date(),
						allHabitsCompleted: true,
					};

					const existingRecord = await getCompletedDayByDateDB(
						db,
						completedDay.date,
					);

					if (existingRecord === null) {
						await saveCompletedDayDB(db, completedDay);
					}
				}
			}
		})();
	}, [completedHabits, habits]);

	const addHabit = async (newHabit: Habit): Promise<boolean> => {
		try {
			const storedHabitsArray = habits ? habits : [];
			storedHabitsArray.push(newHabit);
			setHabits([...storedHabitsArray]);

			await saveHabitDB(db, newHabit);
			//Notificación
			schedulePushNotification(newHabit);

			return true;
		} catch (error) {
			console.error("Error adding habit:", error);
			return false;
		}
	};

	const updateHabit = async (
		habitId: string,
		updatedHabit: Habit,
	): Promise<boolean> => {
		try {
			const existingHabit = await getHabitByIdDB(db, habitId);

			if (existingHabit) {
				await updateHabitDB(db, habitId, updatedHabit);
				// Notificación: Eliminar la notificación anterior y programar una nueva
				await deletePushNotification(habitId);
				await schedulePushNotification(updatedHabit);

				// Actualizar el array de hábitos con el hábito actualizado
				setHabits((prevHabits) => {
					const updatedHabits = prevHabits.map((habit) =>
						habit.id === habitId ? { ...habit, ...updatedHabit } : habit,
					);
					return updatedHabits;
				});

				return true;
			}

			return false; // No se encontró el hábito con el ID dado
		} catch (error) {
			console.error("Error updating habit:", error);
			return false;
		}
	};

	const removeHabit = async (habitId: string) => {
		try {
			await deleteCompletedHabitsByHabitIdDB(db, habitId);

			await deleteHabitByIdDB(db, habitId);

			deletePushNotification(habitId);

			setHabits((prevHabits) =>
				prevHabits.filter((habit) => habit.id !== habitId),
			);

			setCompletedHabits((prevCompletedHabit) =>
				prevCompletedHabit.filter(
					(completedHabit) => completedHabit.habitId !== habitId,
				),
			);
		} catch (error) {
			console.error("Error removing habit:", error);
			// Manejo de errores si es necesario
		}
	};

	//Mark ready habit
	const markHabitAsCompleted = async (habitId: string) => {
		try {
			const habitToComplete = habits.find((habit) => habit.id === habitId);
			if (habitToComplete) {
				if (habitToComplete.requiresGoal) {
					const existingCompletion = await getCompletedHabitByHabitIdDB(
						db,
						habitId,
					);

					if (existingCompletion) {
						existingCompletion.progressPercent =
							(existingCompletion.progressPercent || 0) + 1;
						await updateCompletedHabitDB(db, existingCompletion);
					} else {
						const completion: HabitCompletion = {
							id: randomUUID(),
							habitId: habitId,
							completionDate: new Date(),
							progressPercent: 1,
						};
						await saveCompletedHabitDB(db, completion);
					}
				} else {
					const completion: HabitCompletion = {
						id: randomUUID(),
						habitId: habitId,
						completionDate: new Date(),
					};
					await saveCompletedHabitDB(db, completion);
				}

				const updatedCompletedHabits = await getAllCompletedHabitsDB(db);
				setCompletedHabits(updatedCompletedHabits);
			}
		} catch (error) {
			console.error("Error marking habit as completed:", error);
			// Manejo de errores si es necesario
		}
	};

	const habitContextValue: HabitContextType = {
		habits,
		addHabit,
		updateHabit,
		removeHabit,
		completedHabits,
		markHabitAsCompleted,
		completedDays,
	};

	return (
		<HabitContext.Provider value={habitContextValue}>
			{children}
		</HabitContext.Provider>
	);
};

interface HabitProviderProps {
	children: ReactNode;
}

export function useHabit() {
	return useContext(HabitContext);
}

async function schedulePushNotification(habit: Habit) {
	if (!habit.hasReminder) {
		return;
	}

	const daysToSchedule = habit.daysOfWeek;
	if (daysToSchedule.length === 0) {
		return; // No days specified to schedule, do nothing
	}

	const hour = parseInt(moment(habit.startTime, "HH:mm").format("HH"));
	const minute = parseInt(moment(habit.startTime, "HH:mm").format("mm"));
	if (daysToSchedule.length === 7) {
		await scheduleNotificationAsync({
			content: {
				title: t("reminder"),
				body: `¡${t("is-time")} "${habit.name}"!`,
				data: { habitId: habit.id },
			},
			trigger: { hour: hour, minute: minute, repeats: true },
		});
	} else {
		for (let i = 0; i < daysToSchedule.length; i++) {
			const day = habit.daysOfWeek[i];
			const dayOfWeekNumber = moment().day(day).isoWeekday();
			const weekday = dayOfWeekNumber === 7 ? 1 : dayOfWeekNumber + 1;

			await scheduleNotificationAsync({
				content: {
					title: t("reminder"),
					body: `¡${t("is-time")} "${habit.name}"!`,
					data: { habitId: habit.id },
				},
				trigger: {
					hour: hour,
					minute: minute,
					repeats: true,
					weekday: weekday,
				},
			});
		}
	}
}

async function deletePushNotification(habitId: string) {
	const allNotifications = await getAllScheduledNotificationsAsync();

	const notificationIdentifier = allNotifications.find(
		(notification) => notification.content.data.habitId === habitId,
	)?.identifier;

	if (notificationIdentifier) {
		cancelScheduledNotificationAsync(notificationIdentifier);
	}
}

function checkIfAllHabitsCompleted(
	habits: Habit[],
	completedHabits: HabitCompletion[],
): boolean {
	const allHabitsCompleted = habits.every((habit) => {
		const completedHabit = completedHabits.find(
			(completed) => completed.habitId === habit.id,
		);

		if (
			!completedHabit ||
			(habit.requiresGoal &&
				completedHabit.progressPercent !== habit.goalAmount)
		) {
			return false;
		}
		return true;
	});

	return allHabitsCompleted;
}
