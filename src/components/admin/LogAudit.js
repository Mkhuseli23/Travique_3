// src/utils/logAudit.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase"; // your initialized Firestore

export const logAudit = async (user, action) => {
  if (!user) return;

  try {
    await addDoc(collection(db, "audit_logs"), {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName || "Guest",
      action,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Audit log failed:", error);
  }
};
