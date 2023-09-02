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

				const getCompletedDay = await getAllCompletedDaysDB(db);
				console.log(getCompletedDay.length);
				// deleteAllCompletedDays(db);
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

const sampleHabits = [
	{
		id: "c5e74ec7-1d36-4ec5-b21e-fb738d84db39",
		name: "Morning Workout",
		icon: "💪",
		color: "#FF5733",
		requiresGoal: false,
		goalAmount: 1,
		daysOfWeek: ["monday", "wednesday", "friday"],
		hasReminder: true,
		startTime: "08:00 AM",
	},
	{
		id: "2b903620-d76b-4a10-a191-50fcd3e0dd25",
		name: "Read 30 Minutes",
		icon: "📚",
		color: "#4CAF50",
		requiresGoal: true,
		goalAmount: 30,
		measureUnit: "minutes",
		daysOfWeek: ["tuesday", "thursday", "saturday"],
		hasReminder: false,
		startTime: "09:00 AM",
	},
	{
		id: "d4eb727a-0e0a-4e17-bce0-9e845c82a59b",
		name: "Drink 8 Glasses of Water",
		icon: "🥤",
		color: "#2196F3",
		requiresGoal: true,
		goalAmount: 8,
		measureUnit: "glasses",
		daysOfWeek: ["monday", "wednesday", "friday", "sunday"],
		hasReminder: true,
		startTime: "10:00 AM",
	},
	{
		id: "75a1ad1a-d60e-4ee5-bf9f-68b96331386a",
		name: "Meditate",
		icon: "🧘‍♂️",
		color: "#FFC107",
		requiresGoal: false,
		goalAmount: 1,
		daysOfWeek: ["tuesday", "thursday", "saturday"],
		hasReminder: true,
		startTime: "07:30 AM",
	},
	{
		id: "1b0f6d86-e94b-416e-98b0-6f5942b17e53",
		name: "Learn a New Word",
		icon: "📖",
		color: "#E91E63",
		requiresGoal: false,
		goalAmount: 1,
		daysOfWeek: ["monday", "wednesday", "friday"],
		hasReminder: true,
		startTime: "11:00 AM",
	},
	{
		id: "7b9371f9-d7d7-4e8f-afdd-3ad179cc1ac3",
		name: "Stretching",
		icon: "🧘‍♀️",
		color: "#9C27B0",
		requiresGoal: false,
		goalAmount: 1,
		daysOfWeek: ["tuesday", "thursday", "saturday"],
		hasReminder: true,
		startTime: "06:45 AM",
	},
	{
		id: "d8d99a18-6fa9-4de2-9572-7d0bb1cb7a24",
		name: "Practice Gratitude",
		icon: "❤️",
		color: "#FF5722",
		requiresGoal: false,
		goalAmount: 1,
		daysOfWeek: ["monday", "wednesday", "friday", "sunday"],
		hasReminder: true,
		startTime: "09:30 AM",
	},
	{
		id: "b4f5e2d4-8e89-4c1f-9c42-02913debe962",
		name: "Write in Journal",
		icon: "✏️",
		color: "#795548",
		requiresGoal: false,
		goalAmount: 1,
		daysOfWeek: ["tuesday", "thursday", "saturday"],
		hasReminder: true,
		startTime: "08:30 PM",
	},
	{
		id: "d91d02b6-23b0-451c-a967-861a8d34b14d",
		name: "Healthy Snack",
		icon: "🍎",
		color: "#00BCD4",
		requiresGoal: false,
		goalAmount: 1,
		daysOfWeek: ["monday", "wednesday", "friday"],
		hasReminder: true,
		startTime: "03:00 PM",
	},
	{
		id: "c7792d82-369b-4c47-8b4e-2b3a3813bc33",
		name: "Evening Walk",
		icon: "🚶‍♂️",
		color: "#8BC34A",
		requiresGoal: false,
		goalAmount: 1,
		daysOfWeek: ["tuesday", "thursday", "saturday"],
		hasReminder: true,
		startTime: "06:30 PM",
	},
];

const sampleCompletedHabits = [
	{
		id: "e631c309-9ad3-4c7b-8c24-9e971ba1d57e",
		habitId: "c5e74ec7-1d36-4ec5-b21e-fb738d84db39",
		completionDate: "2023-07-10T08:00:00Z",
		progressPercent: 100,
	},
	{
		id: "2c36c4c9-6fcf-46c7-b095-3b63b36e28c5",
		habitId: "2b903620-d76b-4a10-a191-50fcd3e0dd25",
		completionDate: "2023-07-11T09:00:00Z",
		progressPercent: 100,
	},
	{
		id: "f5e1f82a-926c-43b0-9e34-ea6fe27be676",
		habitId: "d4eb727a-0e0a-4e17-bce0-9e845c82a59b",
		completionDate: "2023-07-12T10:00:00Z",
		progressPercent: 100,
	},
	{
		id: "631c0186-d3fe-4511-868d-d66e7ab93f18",
		habitId: "75a1ad1a-d60e-4ee5-bf9f-68b96331386a",
		completionDate: "2023-07-13T07:30:00Z",
		progressPercent: 100,
	},
	{
		id: "4c89d36a-6d2a-42e7-9865-c35aef1328d1",
		habitId: "1b0f6d86-e94b-416e-98b0-6f5942b17e53",
		completionDate: "2023-07-14T11:00:00Z",
		progressPercent: 100,
	},
	{
		id: "a6ed124d-8ee5-43c5-8527-d2f4e6c2c91d",
		habitId: "7b9371f9-d7d7-4e8f-afdd-3ad179cc1ac3",
		completionDate: "2023-07-15T06:45:00Z",
		progressPercent: 100,
	},
	{
		id: "f742d5f2-bc6b-43a4-9642-0dd46e2016ca",
		habitId: "d8d99a18-6fa9-4de2-9572-7d0bb1cb7a24",
		completionDate: "2023-07-16T20:30:00Z",
		progressPercent: 100,
	},
	{
		id: "fc3e17b3-cdaa-46a1-a5b3-91be6283d2c7",
		habitId: "b4f5e2d4-8e89-4c1f-9c42-02913debe962",
		completionDate: "2023-07-17T15:00:00Z",
		progressPercent: 100,
	},
	{
		id: "e1dfb4d5-4e35-4d34-bbf6-49bb350e965a",
		habitId: "c7792d82-369b-4c47-8b4e-2b3a3813bc33",
		completionDate: "2023-07-18T18:30:00Z",
		progressPercent: 100,
	},
	{
		id: "2f0777dd-8f8a-45b3-8c5d-965f1ef76817",
		habitId: "c5e74ec7-1d36-4ec5-b21e-fb738d84db39",
		completionDate: "2023-07-19T08:00:00Z",
		progressPercent: 100,
	},
	{
		id: "aad53a48-d3c0-4647-91e9-38e562b24c8b",
		habitId: "2b903620-d76b-4a10-a191-50fcd3e0dd25",
		completionDate: "2023-07-20T09:00:00Z",
		progressPercent: 100,
	},
	{
		id: "ef8e13a3-4bcf-4167-9e51-02d06d789c77",
		habitId: "d4eb727a-0e0a-4e17-bce0-9e845c82a59b",
		completionDate: "2023-07-21T10:00:00Z",
		progressPercent: 100,
	},
	{
		id: "91dd29c5-b90f-4b6b-913a-9ed151b108fc",
		habitId: "75a1ad1a-d60e-4ee5-bf9f-68b96331386a",
		completionDate: "2023-07-22T07:30:00Z",
		progressPercent: 100,
	},
	{
		id: "9b7248cd-697c-47b0-b8ce-37a106fbaa00",
		habitId: "1b0f6d86-e94b-416e-98b0-6f5942b17e53",
		completionDate: "2023-07-23T11:00:00Z",
		progressPercent: 100,
	},
	{
		id: "3fe44fc1-68d1-4c99-85ea-b6c87c251601",
		habitId: "7b9371f9-d7d7-4e8f-afdd-3ad179cc1ac3",
		completionDate: "2023-07-24T06:45:00Z",
		progressPercent: 100,
	},
	{
		id: "457c03f7-d6ab-4f74-b04b-bf8b65638d1d",
		habitId: "d8d99a18-6fa9-4de2-9572-7d0bb1cb7a24",
		completionDate: "2023-07-25T20:30:00Z",
		progressPercent: 100,
	},
	{
		id: "9b183b0e-47c1-4579-9984-1a4401a1f0a1",
		habitId: "b4f5e2d4-8e89-4c1f-9c42-02913debe962",
		completionDate: "2023-07-26T15:00:00Z",
		progressPercent: 100,
	},
	{
		id: "589f8769-12b2-4992-8faa-6620a084d7f9",
		habitId: "c7792d82-369b-4c47-8b4e-2b3a3813bc33",
		completionDate: "2023-07-27T18:30:00Z",
		progressPercent: 100,
	},
	{
		id: "c827998a-6ad3-4e2a-9ee2-7b4db1c68598",
		habitId: "c5e74ec7-1d36-4ec5-b21e-fb738d84db39",
		completionDate: "2023-07-28T08:00:00Z",
		progressPercent: 100,
	},
	{
		id: "caebab0c-6166-4f2d-82db-cc5045eb7642",
		habitId: "2b903620-d76b-4a10-a191-50fcd3e0dd25",
		completionDate: "2023-07-29T09:00:00Z",
		progressPercent: 100,
	},
	{
		id: "8efcfb0b-2086-4d47-9257-1c93d0e77b3f",
		habitId: "d4eb727a-0e0a-4e17-bce0-9e845c82a59b",
		completionDate: "2023-07-30T10:00:00Z",
		progressPercent: 100,
	},
	{
		id: "8b5fb22c-4420-44e4-8d52-4ec90397c562",
		habitId: "75a1ad1a-d60e-4ee5-bf9f-68b96331386a",
		completionDate: "2023-07-31T07:30:00Z",
		progressPercent: 100,
	},
	{
		id: "9c2e9479-4bc3-4cf1-b33a-2ed3845c9172",
		habitId: "1b0f6d86-e94b-416e-98b0-6f5942b17e53",
		completionDate: "2023-08-01T11:00:00Z",
		progressPercent: 100,
	},
	{
		id: "b1b238c5-8b6c-4ef1-92e3-148dedfe943f",
		habitId: "7b9371f9-d7d7-4e8f-afdd-3ad179cc1ac3",
		completionDate: "2023-08-02T06:45:00Z",
		progressPercent: 100,
	},
	{
		id: "e2279e01-19c5-4e85-b35a-b09c68416879",
		habitId: "d8d99a18-6fa9-4de2-9572-7d0bb1cb7a24",
		completionDate: "2023-08-03T20:30:00Z",
		progressPercent: 100,
	},
	{
		id: "1e9abab1-7b8b-4726-b5a1-0b7c605a61b3",
		habitId: "b4f5e2d4-8e89-4c1f-9c42-02913debe962",
		completionDate: "2023-08-04T15:00:00Z",
		progressPercent: 100,
	},
	{
		id: "20d5467e-1f88-4cbf-8d4b-3525547f006b",
		habitId: "c7792d82-369b-4c47-8b4e-2b3a3813bc33",
		completionDate: "2023-08-05T18:30:00Z",
		progressPercent: 100,
	},
	{
		id: "f481e09c-2f91-4d9e-912f-735eeef0a7e5",
		habitId: "c5e74ec7-1d36-4ec5-b21e-fb738d84db39",
		completionDate: "2023-08-06T08:00:00Z",
		progressPercent: 100,
	},
	{
		id: "d7127e9b-06c9-48a9-8f7f-1fc4eb8f10d1",
		habitId: "2b903620-d76b-4a10-a191-50fcd3e0dd25",
		completionDate: "2023-08-07T09:00:00Z",
		progressPercent: 100,
	},
	{
		id: "7dd4c3ea-148c-4f20-bc0a-1652f5d134b3",
		habitId: "d4eb727a-0e0a-4e17-bce0-9e845c82a59b",
		completionDate: "2023-08-08T10:00:00Z",
		progressPercent: 100,
	},
	{
		id: "ecf61453-dc60-4749-8257-1a56d1d18c29",
		habitId: "75a1ad1a-d60e-4ee5-bf9f-68b96331386a",
		completionDate: "2023-08-09T07:30:00Z",
		progressPercent: 100,
	},
	{
		id: "d7743f70-799b-41dd-a7d7-693f75d7646b",
		habitId: "1b0f6d86-e94b-416e-98b0-6f5942b17e53",
		completionDate: "2023-08-10T11:00:00Z",
		progressPercent: 100,
	},
	{
		id: "1292d5fb-6924-44cc-a800-59466f68773b",
		habitId: "7b9371f9-d7d7-4e8f-afdd-3ad179cc1ac3",
		completionDate: "2023-08-11T06:45:00Z",
		progressPercent: 100,
	},
	{
		id: "38eb48e4-36f6-4d5a-94ce-9c0ef49e1933",
		habitId: "d8d99a18-6fa9-4de2-9572-7d0bb1cb7a24",
		completionDate: "2023-08-12T20:30:00Z",
		progressPercent: 100,
	},
	{
		id: "8b0aae4a-070d-4a4a-8683-dc34b8938eb2",
		habitId: "b4f5e2d4-8e89-4c1f-9c42-02913debe962",
		completionDate: "2023-08-13T15:00:00Z",
		progressPercent: 100,
	},
	{
		id: "c6c83626-32c6-4f67-94c7-6e183ec6d04e",
		habitId: "c7792d82-369b-4c47-8b4e-2b3a3813bc33",
		completionDate: "2023-08-14T18:30:00Z",
		progressPercent: 100,
	},
	{
		id: "d24981b0-3c8d-4eb4-93c4-b152b4ffbf3a",
		habitId: "c5e74ec7-1d36-4ec5-b21e-fb738d84db39",
		completionDate: "2023-08-15T08:00:00Z",
		progressPercent: 100,
	},
	{
		id: "92e04081-35ed-49e4-b994-2437f752eedd",
		habitId: "2b903620-d76b-4a10-a191-50fcd3e0dd25",
		completionDate: "2023-08-16T09:00:00Z",
		progressPercent: 100,
	},
	{
		id: "c9a4b144-cfc7-4603-87f7-3fb3668c91b2",
		habitId: "d4eb727a-0e0a-4e17-bce0-9e845c82a59b",
		completionDate: "2023-08-17T10:00:00Z",
		progressPercent: 100,
	},
	{
		id: "db1905ff-3e1d-4b86-b1f0-1c60edca39d2",
		habitId: "75a1ad1a-d60e-4ee5-bf9f-68b96331386a",
		completionDate: "2023-08-18T07:30:00Z",
		progressPercent: 100,
	},
	{
		id: "0e188a86-e4ff-4f20-bb35-e5ab0a1aae6d",
		habitId: "1b0f6d86-e94b-416e-98b0-6f5942b17e53",
		completionDate: "2023-08-19T11:00:00Z",
		progressPercent: 100,
	},
	{
		id: "ac5d15f9-282a-4be5-b64e-2732cc1d3659",
		habitId: "7b9371f9-d7d7-4e8f-afdd-3ad179cc1ac3",
		completionDate: "2023-08-20T06:45:00Z",
		progressPercent: 100,
	},
	{
		id: "c3f241bf-378c-4f42-9e63-9e6e7552f2d0",
		habitId: "1b0f6d86-e94b-416e-98b0-6f5942b17e53",
		completionDate: "2023-08-21T08:30:00Z",
		progressPercent: 100,
	},
	{
		id: "c87149a1-08de-4b3a-ae0e-cb2d6c4ccbad",
		habitId: "d4eb727a-0e0a-4e17-bce0-9e845c82a59b",
		completionDate: "2023-08-21T09:30:00Z",
		progressPercent: 100,
	},
	{
		id: "a23bda81-9a62-4e9e-92ab-2e17f0e1b93b",
		habitId: "75a1ad1a-d60e-4ee5-bf9f-68b96331386a",
		completionDate: "2023-08-21T07:00:00Z",
		progressPercent: 100,
	},
	{
		id: "5f9ac739-9f1a-423f-90ad-ccff032ba66f",
		habitId: "1292d5fb-6924-44cc-a800-59466f68773b",
		completionDate: "2023-08-22T11:00:00Z",
		progressPercent: 100,
	},
	{
		id: "b7b15fb4-784d-42a9-bd5e-e2b4db68dded",
		habitId: "38eb48e4-36f6-4d5a-94ce-9c0ef49e1933",
		completionDate: "2023-08-22T20:30:00Z",
		progressPercent: 100,
	},
	{
		id: "61b31c6d-6ac6-450e-914e-52b899c032b1",
		habitId: "8b0aae4a-070d-4a4a-8683-dc34b8938eb2",
		completionDate: "2023-08-22T15:00:00Z",
		progressPercent: 100,
	},
	{
		id: "86a445a1-e5b0-425e-8a9c-3b3d33da45ef",
		habitId: "c6c83626-32c6-4f67-94c7-6e183ec6d04e",
		completionDate: "2023-08-23T18:30:00Z",
		progressPercent: 100,
	},
	{
		id: "8d06e9e3-8871-4f16-8a5a-7c6e6a8c6d91",
		habitId: "d24981b0-3c8d-4eb4-93c4-b152b4ffbf3a",
		completionDate: "2023-08-23T08:00:00Z",
		progressPercent: 100,
	},
	{
		id: "adcc5f9e-7a95-4019-989c-cd5611ad0a00",
		habitId: "92e04081-35ed-49e4-b994-2437f752eedd",
		completionDate: "2023-08-23T09:00:00Z",
		progressPercent: 100,
	},
	{
		id: "c309c9d7-9f8c-4c65-a940-3b6f6be7318f",
		habitId: "c9a4b144-cfc7-4603-87f7-3fb3668c91b2",
		completionDate: "2023-08-23T10:00:00Z",
		progressPercent: 100,
	},
];
