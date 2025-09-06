// 파이어베이스 SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// quill 설정
const quill = new Quill("#content");
quill.enable(false);

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

const postType = {performance:"수행평가", schedule:"학사일정", tip:"정보/팁", etc:"기타"};

async function load() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const post = await getDoc(doc(db, "posts", id));
    const data = post.data();

    console.log(data);
    quill.setContents(JSON.parse(data.content));
    document.querySelector("h1").innerText = data.title;
    document.getElementById("name").innerText = data.name;
    document.getElementById("type").innerText = postType[data.type];
}

load();