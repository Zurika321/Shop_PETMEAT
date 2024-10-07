// src/firebase.js
import app from "./firebaseConfig"; // Import cấu hình Firebase
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Khởi tạo Firestore
const db = getFirestore(app);

// Khởi tạo Authentication
const auth = getAuth(app);

export { db, auth }; // Xuất db và auth để sử dụng ở nơi khác
