# Habitify

This is an open-source habit tracking app built using React Native and Expo. The app allows users to add, modify, and delete habits, as well as mark habits as completed. It also includes reminder notifications for habits that require them.

## Getting Started

To get started with development, follow these steps:

1. Clone the repository: 
  `git clone git@github.com:fernando343/habitify.git`
1. Install dependencies: 
   `yarn`
2. Start the development server: 
3. `npx expo start`


## Features

- Add habits with various settings like name, icon, color, goal, days of the week, and reminders.
- Modify and delete existing habits.
- Mark habits as completed, with optional progress tracking.
- Habit data is stored using AsyncStorage and Realm.

## Context API

The app uses a HabitContext provider to manage the state and actions related to habits. The context provides methods for adding, updating, and removing habits, as well as marking habits as completed.

## Notification Handling

Notification scheduling and cancellation are managed using the Expo Notifications module. Reminders for habits are triggered based on specified days of the week and times.

## Sample Habits

The app includes sample habit data to demonstrate its functionality. You can find the sample habits in the 'sampleHabits' array in the source code.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

