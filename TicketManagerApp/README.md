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

## Setup Firebase

Requirements for Firebase setup:

- A Firebase project with Firestore and Authentication enabled.
- A web app registered in your Firebase project.
- 2 collections in Firestore:
  - `tickets`: to store ticket data
  - `comments`: to store comments on tickets

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Run the app using APK (Android only, do not need to run the previous steps)

1. Download the APK and install it on your Android device. You can find the APK in the [releases section](https://github.com/Valentinnnnnnnnnn/reactnative/releases/latest) of this repository.
   Make sure to enable installation from unknown sources in your device settings.

2. Open the app on your device and log in with these credentials:

   - Email: `test@test.fr`
   - Password: `azerty`

3. You can now use the app to create, view, and manage tickets.
