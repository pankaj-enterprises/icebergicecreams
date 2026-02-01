import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_iHIeo4FU62WRzKPl1pudNt0nRKkCTvk",
  authDomain: "ice-berg-icecreams.firebaseapp.com",
  projectId: "ice-berg-icecreams",
  storageBucket: "ice-berg-icecreams.firebasestorage.app",
  messagingSenderId: "934034503737",
  appId: "1:934034503737:web:ffc390360a3137d38235e8",
  measurementId: "G-CCEF5TY5D9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
