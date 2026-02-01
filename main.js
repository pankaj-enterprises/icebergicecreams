import { db } from './firebase.js';
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Init
const user = localStorage.getItem('user_email');
const navEmail = document.getElementById('navUserEmail');
if(user && navEmail) navEmail.innerText = user;

// Load Logo
getDoc(doc(db, "site_settings", "logo")).then(snap => {
    if(snap.exists()) {
        document.querySelectorAll('.logo').forEach(el => {
            if(snap.data().url) el.innerHTML = `<img src="${snap.data().url}" style="height:40px;">`;
        });
    }
});

// Search Toggle
const searchIcon = document.getElementById('searchIcon');
if(searchIcon) {
    searchIcon.addEventListener('click', () => {
        document.getElementById('searchBar').classList.toggle('active');
    });
}

// Search Logic
const searchInput = document.getElementById('searchInput');
if(searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            window.location.href = `index.html?search=${searchInput.value}`;
        }
    });
}

// Hamburger
const ham = document.getElementById('hamburger');
if(ham) {
    ham.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.toggle('active');
    });
}
