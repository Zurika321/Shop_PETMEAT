// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyAV3RSlsDs5kk2tUIImsC3KHG2fwqmMtjE",
  authDomain: "shoppetmeat.firebaseapp.com",
  projectId: "shoppetmeat",
  storageBucket: "shoppetmeat.appspot.com",
  messagingSenderId: "160691219979",
  appId: "1:160691219979:web:c9452d88c0a8c80557210e",
  measurementId: "G-QM6ZXTCTMJ",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

export default app;
