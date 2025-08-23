// 파이어베이스 SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// 파이어베이스 쓰기
async function addPost() {
    try {
        await addDoc(collection(db, "posts"), {
            title: document.getElementById("title").value,
            type: document.getElementById("type").value,
            content: document.getElementById("content").value,
            createdAt: new Date()
        });
        window.location.href = "..";
    } catch (e) {
        alert("오류가 발생하였습니다.");
    }
}

document.getElementById("post").addEventListener("click", addPost);