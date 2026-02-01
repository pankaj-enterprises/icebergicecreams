import { db } from './firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const ADMIN_EMAIL = "tripathivlogs39@gmail.com";
const SERVICE_ID = "service_y6emv8m";
const USER_TEMPLATE = "template_wdjkjnf";
const ADMIN_TEMPLATE = "template_jh17g4k";

// === USER LOGIN ===
export function setupUserLogin() {
    let otp = null;
    let email = "";

    const getBtn = document.getElementById('getOtpBtn');
    const verBtn = document.getElementById('verifyOtpBtn');

    if(getBtn) {
        getBtn.addEventListener('click', () => {
            email = document.getElementById('userEmail').value;
            if(!email) return alert("Enter Email");
            
            otp = Math.floor(100000 + Math.random() * 900000);
            emailjs.send(SERVICE_ID, USER_TEMPLATE, { to_email: email, otp: otp, purpose: "Login" })
            .then(() => {
                document.getElementById('step1').style.display = 'none';
                document.getElementById('step2').style.display = 'block';
                alert("OTP Sent");
            });
        });
    }

    if(verBtn) {
        verBtn.addEventListener('click', async () => {
            if(document.getElementById('userOtp').value == otp) {
                localStorage.setItem('user_email', email);
                await setDoc(doc(db, "users", email), { email: email, lastLogin: new Date() }, { merge: true });
                window.location.href = "index.html";
            } else {
                alert("Invalid OTP");
            }
        });
    }
}

// === ADMIN LOGIN ===
export function setupAdminLogin() {
    let otp = null;

    document.getElementById('verifyAdminEmail').addEventListener('click', () => {
        const email = document.getElementById('adminEmail').value;
        if(email !== ADMIN_EMAIL) {
            emailjs.send(SERVICE_ID, ADMIN_TEMPLATE, {
                to_email: ADMIN_EMAIL, attempt_email: email, purpose: "Unauthorized Access", otp: "N/A"
            });
            return alert("Email not eligible for admin panel");
        }

        otp = Math.floor(100000 + Math.random() * 900000);
        emailjs.send(SERVICE_ID, ADMIN_TEMPLATE, {
            to_email: ADMIN_EMAIL, otp: otp, purpose: "Admin Login", attempt_email: email
        }).then(() => {
            document.getElementById('loginStep1').style.display = 'none';
            document.getElementById('loginStep2').style.display = 'block';
        });
    });

    document.getElementById('adminLoginBtn').addEventListener('click', () => {
        if(document.getElementById('adminOtp').value == otp) {
            document.getElementById('authOverlay').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'block';
        } else {
            alert("Invalid OTP");
        }
    });
}
