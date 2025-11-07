# ChatbotNonStandalone

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deploying on Render

Set the following environment variables in your Render service settings before building:

- `API_URL` - base URL for your backend API (used as `environment.apiUrl`).
- `SOCKET_URL` - URL for socket server (used as `environment.socketUrl`).

Render build command (in Render dashboard) should run:

```
npm run build:render
```

This runs `scripts/write-env.js` to generate `src/environments/environment.prod.ts` from the environment variables and then builds the app with the production configuration.

## Deploying on Firebase

If you're deploying the built UI to Firebase Hosting, you can reuse the same writer to inject runtime values at build time.

Locally (before `firebase deploy`):

1. Export environment variables in your shell (PowerShell example):

```powershell
$env:API_URL = 'https://api.yourdomain.com'
$env:SOCKET_URL = 'https://socket.yourdomain.com'
npm run build:firebase
firebase deploy --only hosting
```

2. In CI (recommended), set `API_URL` and `SOCKET_URL` as secret environment variables and run `npm run build:firebase` followed by `firebase deploy --only hosting` in your pipeline.

The `build:firebase` script runs `scripts/write-env.js` to generate `src/environments/environment.prod.ts` from `API_URL` / `SOCKET_URL` and then performs an Angular production build into `dist/chatbot-non-standalone`, which is what `firebase.json` is configured to serve.
