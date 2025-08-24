// 파이어베이스 SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

//IP주소 가져오기
let ipn = ''
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        ipn = data.ip;
    })
    .catch(error => {
        console.error("Error fetching IP:", error);
    });

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
const auth = getAuth(app);

// 파이어베이스 익명 로그인
async function login() {
    try {
        await signInAnonymously(auth);
        console.log("익명 로그인 성공");
    } catch (error) {
        alert("로그인 과정에서 오류가 발생하였습니다.");
        window.location.href = "..";
    }
};
login();

let currentUser = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("현재 사용자 UID:", user.uid);
    } else {
        currentUser = null;
    }
});

// 파이어베이스 쓰기
async function addPost() {
    try {
        await addDoc(collection(db, "posts"), {
            title: document.getElementById("title").value,
            type: document.getElementById("type").value,
            content: document.getElementById("content").value,
            uid: currentUser.uid,
            ip: ipn,
            createdAt: new Date()
        });
        window.location.href = "..";
    } catch (e) {
        alert("글 쓰는 과정에서 오류가 발생하였습니다.");
    }
}

document.getElementById("post").addEventListener("click", addPost);
