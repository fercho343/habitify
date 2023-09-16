type Color = `#${string}`;

export type DayOfWeek =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";

export interface Habit {
	id: string;
	name: string;
	description?: string;
	icon: string;
	color: Color;
	requiresGoal: boolean;
	goalAmount?: number | null;
	measureUnit?: string;
	daysOfWeek: Array<DayOfWeek>;
	hasReminder: boolean;
	startTime: string;
}

export interface HabitCompletion {
	id: string;
	habitId: string;
	completionDate: Date;
	progressPercent?: number;
}

export interface CompletedDay {
	id: string;
	date: Date;
	allHabitsCompleted: boolean;
}

interface HabitContextType {
	habits: Habit[];
	addHabit: (newHabit: Habit) => Promise<boolean>;
	updateHabit: (habitId: string, updatedHabit: Habit) => Promise<boolean>;
	removeHabit: (habitId: string) => void;
	completedHabits: HabitCompletion[];
	markHabitAsCompleted: (habitId: string) => void;
	completedDays: CompletedDay[];
}
