import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD5Na09REN9_ZawVz1W_JYbZWo1bIjpcuE",
  authDomain: "https://hcg-chat.vercel.app/",
  projectId: "hcg-chat",
  storageBucket: "hcg-chat.appspot.com",
  messagingSenderId: "23372669823",
  appId: "1:23372669823:web:191316af36dde0fc2a704a",
  measurementId: "G-1ETS55M2T0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

