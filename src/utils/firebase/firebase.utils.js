import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    signInWithRedirect, 
    GoogleAuthProvider 
} from 'firebase/auth';

import {
    getFirestore,
    doc, //get data
    getDoc, //access data
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAS6bKAPoyDL5fUkfFOgpsnzwm_nL5ij0",
    authDomain: "crwn-clothing-db-1a446.firebaseapp.com",
    projectId: "crwn-clothing-db-1a446",
    storageBucket: "crwn-clothing-db-1a446.appspot.com",
    messagingSenderId: "202446997094",
    appId: "1:202446997094:web:53a6341b6fe20d97108fa7"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account" //force to select an account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}