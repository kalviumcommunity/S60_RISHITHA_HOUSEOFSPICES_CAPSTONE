import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// ❌ Remove Analytics import
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBgcEW6hKXbHpJcChUlMfWrkHFDpMov4Oc",
  authDomain: "capstone-3f443.firebaseapp.com",
  projectId: "capstone-3f443",
  storageBucket: "capstone-3f443.appspot.com",
  messagingSenderId: "26795849480",
  appId: "1:26795849480:web:1b3350222f60ea57a75ebd",
  measurementId: "G-05QBCD961W"
};

const app = initializeApp(firebaseConfig);

// ❌ Remove this line
// const anal = getAnalytics(app);

export const auth = getAuth(app);
export default app;
