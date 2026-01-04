// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApN_x2Kh3S-iCFR7d1oOhq6sRuSL2TSoE",
  authDomain: "english-raid-db.firebaseapp.com",
  projectId: "english-raid-db",
  storageBucket: "english-raid-db.firebasestorage.app",
  messagingSenderId: "260238909700",
  appId: "1:260238909700:web:e21f62684fbf2d1f33f051",
  measurementId: "G-09T6NKG8HV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveScore = async (username, school, score, level) => {
  try {
    await addDoc(collection(db, "scores"), {
      name: username,
      school: school,
      score: score,
      level: level,
      date: new Date().toISOString()
    });
    return true;
  } catch (e) {
    console.error("Error saving score:", e);
    return false;
  }
};

export const getLeaderboard = async (level) => {
  try {
    const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(50));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data());
    // Client-side filtering to ensure we only get the requested level
    return data.filter(item => item.level == level).slice(0, 10);
  } catch (e) {
    console.error("Error fetching leaderboard:", e);
    return [];
  }
};