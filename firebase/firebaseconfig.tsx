// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBrE8J8HUpShCscbt-CzuR-b646nN7klho',
    authDomain: 'pdfviewerapp-1e3f4.firebaseapp.com',
    projectId: 'pdfviewerapp-1e3f4',
    storageBucket: 'pdfviewerapp-1e3f4.appspot.com',
    messagingSenderId: '887557251479',
    appId: '1:887557251479:web:f69e9a7cd3722fe800a4d2',
    measurementId: 'G-2J63D4HW84',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {
    database,
};
