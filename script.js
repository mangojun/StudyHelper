// 파이어베이스 SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 파이어베이스 설정
const firebaseConfig = {
    apiKey: "AIzaSyDMsu8e9wN2AqcFhmUqTKdQWmURhthVM90",
    authDomain: "studyhelper-bfc0e.firebaseapp.com",
    projectId: "studyhelper-bfc0e",
    storageBucket: "studyhelper-bfc0e.firebasestorage.app",
    messagingSenderId: "157776907304",
    appId: "1:157776907304:web:64d73f94571623e9d4391d",
    measurementId: "G-03657BE6S1"
};

// 파이어베이스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 파이어베이스 읽기
async function loadUsers() {
    const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach((doc) => {
        const data = doc.data();

        const article = document.createElement("article");
        article.className = "performance";
        article.innerHTML = `
            <h2>${data.title}</h2>
            <h3>${data.type}</h3>
            <div>${data.content}</div>
        `;

        document.querySelector("main").appendChild(article);
    });
}

loadUsers();