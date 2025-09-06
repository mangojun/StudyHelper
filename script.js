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

const postType = {performance:"수행평가", schedule:"학사일정", tip:"정보/팁", etc:"기타"};

// 파이어베이스 읽기
async function loadUsers() {
    const posts = await getDocs(collection(db, "posts"));
    console.log(posts);

    posts.forEach((doc) => {
        const data = doc.data();

        const post = document.createElement("a");

        if(data.type in postType) {
            if(data.uid == "e46hd5AkaOeAiMkYvUrQpRLWDzr2") {
                post.className = `post admin ${data.type}`;
            } else {
                post.className = `post ${data.type}`;
            }
            post.href = `post/?id=${doc.id}`;
            post.innerHTML = `
                <h2>${data.title}</h2>
                <h3>${postType[data.type]} ${data.name}</h3>
                <div class="preview">${data.preview}</div>
            `;
        
            document.querySelector("main").appendChild(post);
        }
    });
}

loadUsers();