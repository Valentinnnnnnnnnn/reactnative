## App presentation

This simple ticket app is built with [Expo Router](https://expo.github.io/router/docs/) and [Expo SDK](https://docs.expo.dev/versions/latest/). It's using Firebase for authentication and Firestore for data storage.

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Fill .env.exemple

   Copy the `.env.ts.exemple` file to `.env.ts` and fill in the required environment variables. This file is used to configure your app's environment settings.

   ```bash
   cp .env.ts.exemple .env.ts
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
