type Color = `#${string}`;

export type Frequency =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";

export interface HabitForm {
	name: string;
	description?: string;
	icon: string;
	color: Color;
	requiresGoal: boolean;
	goalAmount?: number | null;
	measureUnit?: string;
	frequency: Array<Frequency>;
	hasReminder: boolean;
	startTime: string;
}

export interface Habit extends HabitForm {
	id: string;
}
