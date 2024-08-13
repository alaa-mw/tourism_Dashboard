import { initializeApp } from "firebase/app";

import { getMessaging , getToken} from "firebase/messaging";

//Firebase Config values imported from .env file
export const firebaseConfig = {
    apiKey: "AIzaSyDLp52E7-yzXST6OHAYT5dWF1Gjfl2ZP1M",
    authDomain: "test-49b2e.firebaseapp.com",
    projectId: "test-49b2e",
    storageBucket: "test-49b2e.appspot.com",
    messagingSenderId: "707645520656",
    appId: "1:707645520656:web:bbc9cb8813c9d768d58395",
    measurementId: "G-6236M2K7SL"
    // apiKey: "AIzaSyBk12Qo9cFAWxx4pqF4qNRBpAnPN-fnmAc",
    // authDomain: "first-notifications-6ebf6.firebaseapp.com",
    // projectId: "first-notifications-6ebf6",
    // storageBucket: "first-notifications-6ebf6.appspot.com",
    // messagingSenderId: "773957271531",
    // appId: "1:773957271531:web:97c0b6678405993663e3ae",
    // measurementId: "G-669HRS118F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);
export let token: string;
export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);

    if (permission === 'granted'){
        token = await getToken(messaging,{
            vapidKey:
            "BEeQqhGTa4Fb-1lPMfQNQugDlewd8kCJ7UPeEY2ykSIBvIr1gZMIezt87Hph5EIYzmll94ZEBzCDNlouQ1psjRw",
            // "BHD1INAlzl5qOMNh6zFDSCt9B-DX6iyKnvD5OozPspUXtQavZYVHfUqRlsjs-kietnze-Gl_C0YJ2CoxGeDucao",
        })
        console.log(token)
        localStorage.setItem("fcm_token",token);
    } else if (permission === "denied") {
        //notifications are blocked
        alert("You denied for the notification");
    }
   
}

