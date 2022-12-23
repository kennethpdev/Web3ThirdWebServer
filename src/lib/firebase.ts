import admin from 'firebase-admin';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

// Create Server-Side Instance of Firebase
export default function initializeFirebaseServer(): {
  db: Firestore;
  auth: Auth;
} {
  if (admin.apps.length === 0) {
    initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }

  const db = getFirestore();
  const auth = getAuth();

  return {
    db,
    auth,
  };
}
