type ID = `${string}-${string}-${string}-${string}-${string}`;
type Color = `#${string}`;
type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export interface Habit {
	readonly id?: ID;
	name: string;
	description?: string;
	icon: string;
	color: string;
	requires_goal: boolean;
	goal?: number | null;
	measure?: string;
	frequencies: Array<Day>;
	reminders: boolean;
	start_time?: string | null;
}
