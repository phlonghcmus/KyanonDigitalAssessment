import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { UserInfo } from '../../share/types';
const firebaseConfig = {
  apiKey: 'AIzaSyA5ZS7Vv11bvi_p02vQ3t5pIhAlLQk-U4A',
  authDomain: 'kyanondigital-b51b8.firebaseapp.com',
  projectId: 'kyanondigital-b51b8',
  storageBucket: 'kyanondigital-b51b8.appspot.com',
  messagingSenderId: '112464356710',
  appId: '1:112464356710:web:c65a00a6f141539ab014a7',
  measurementId: 'G-P2YQMCS03F',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    return err;
  }
};
const logout = () => {
  signOut(auth);
};
const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err: any) {
    return err;
  }
};
const getUserById = async (uid: string | undefined): Promise<any> => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  let data;
  querySnapshot.forEach((doc) => {
    data = doc.data();
  });
  return data;
};

const updateUserById = async (uid: string | undefined, info: UserInfo) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  let data;
  querySnapshot.forEach(async (doc) => {
    data = doc.data();
    await updateDoc(doc.ref, {
      fullName: info.fullName,
      email: info.email,
      birth: info.birth,
      phoneNumber: info.phoneNumber,
    });
  });
};
export {
  auth,
  db,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  getUserById,
  updateUserById,
};
