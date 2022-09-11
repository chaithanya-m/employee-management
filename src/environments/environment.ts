// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDvt16LxqKHkSEjA6uA6-RX54eLhrBBiO8",
    authDomain: "employee-3e7b5.firebaseapp.com",
    projectId: "employee-3e7b5",
    storageBucket: "employee-3e7b5.appspot.com",
    messagingSenderId: "97528532026",
    appId: "1:97528532026:web:4439a180bda5019d5a3903",
    measurementId: "G-N9J39S5TT2",
    databaseURL: "https://employee-3e7b5-default-rtdb.asia-southeast1.firebasedatabase.app"
  }
};
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
