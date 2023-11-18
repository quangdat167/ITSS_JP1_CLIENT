// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyANHB2dq-x3khSpEngyAxvKPLekkJ0d39g',
    authDomain: 'authen-app-402c6.firebaseapp.com',
    databaseURL: 'https://authen-app-402c6-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'authen-app-402c6',
    storageBucket: 'authen-app-402c6.appspot.com',
    messagingSenderId: '509342569698',
    appId: '1:509342569698:web:dbcb4cc8b578c5b1ab3abb',
    measurementId: 'G-MSR9LT3H5J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
