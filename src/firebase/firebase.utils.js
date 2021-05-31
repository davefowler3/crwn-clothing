import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDdVlDmAb7ckdkPyDAAX_MfSwtnV7ZIr3k",
  authDomain: "crwn-db-28478.firebaseapp.com",
  projectId: "crwn-db-28478",
  storageBucket: "crwn-db-28478.appspot.com",
  messagingSenderId: "330413507650",
  appId: "1:330413507650:web:8aed8a675f6dea72fcd9db",
  measurementId: "G-0HK836GR3K",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
