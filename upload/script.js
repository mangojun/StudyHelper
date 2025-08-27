// 파이어베이스 SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// IP주소 가져오기
let ip = ''
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        ip = data.ip;
    })
    .catch(error => {
        console.error("Error fetching IP:", error);
    });

// quill 설정
const quill = new Quill("#content", {
    theme: "snow",
    placeholder: "내용을 입력하세요...",
    modules: {
        toolbar: [
            ["bold", "italic", "underline"],
            [{"header": [1, 2, 3, false]}],
            [{"list": "ordered"}, {"list": "bullet"}],
            ["link", "formula", "clean"]
        ]
    }
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
const provider = new GoogleAuthProvider();
const auth = getAuth();

// 파이어베이스 구글 로그인
async function login() {
    try {
        signInWithPopup(auth, provider);
    } catch(e) {
        alert("로그인 과정에서 오류가 발생하였습니다.", e);
    }
}

async function logout() {
    try {
        signOut(auth);
    } catch(e) {
        alert("로그아웃 과정에서 오류가 발생하였습니다.", e);
    }
}

let user;
onAuthStateChanged(auth, (result) => {
    if(result) {
        user = result;
        document.getElementById("sign").addEventListener("click", logout);
        document.getElementById("sign").removeEventListener("click", login);
        document.getElementById("sign").textContent = "로그아웃";
        document.querySelector("h1").textContent = `${user.displayName}`;
    } else {
        user = null;
        document.getElementById("sign").addEventListener("click", login);
        document.getElementById("sign").removeEventListener("click", logout);
        document.getElementById("sign").textContent = "로그인";
        document.querySelector("h1").textContent = "로그아웃 됨";
    }
});

// 파이어베이스 쓰기
async function addPost() {
    if(user) {
        try {
            await addDoc(collection(db, "posts"), {
                title: document.getElementById("title").value,
                type: document.getElementById("type").value,
                content: quill.root.innerHTML,
                uid: user.uid,
                name: user.displayName,
                ip: ip,
                createdAt: new Date()
            });
            window.location.href = "..";
        } catch(e) {
            alert(`포스트 과정에서 오류가 발생하였습니다. ${e}`);
        }
    } else {
        alert("로그인이 필요한 동작입니다.")
    }
}

document.getElementById("post").addEventListener("click", addPost);




