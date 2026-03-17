// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } 
       from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgWhjhHfUA5tjXNqo5Ci67mKVFhdw-62g",
    authDomain: "planme-cb749.firebaseapp.com",
    projectId: "planme-cb749",
    storageBucket: "planme-cb749.firebasestorage.app",
    messagingSenderId: "365862800805",
    appId: "1:365862800805:web:20716ddab9a92c20e32c4c",
    measurementId: "G-1DMXDB7DGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const studentCol = collection(db, "students");

// ดึง Element จาก HTML
const btnSave = document.getElementById('btnSave');
const studentList = document.getElementById('studentList');

// ฟังก์ชันบันทึกข้อมูล
btnSave.addEventListener('click', async () => {
    const name = document.getElementById('studentName').value;
    const sid = document.getElementById('studentId').value;

    if (name && sid) {
        try {
            await addDoc(studentCol, {
                name: name,
                studentId: sid,
                timestamp: new Date()
            });
            alert("บันทึกสำเร็จ!");
            document.getElementById('studentName').value = "";
            document.getElementById('studentId').value = "";
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
    }
});

// ฟังก์ชันดึงข้อมูลแบบ Real-time
onSnapshot(studentCol, (snapshot) => {
    studentList.innerHTML = "";
    snapshot.forEach((docData) => {
        const data = docData.data();
        const row = `
            <tr>
                <td>${data.studentId}</td>
                <td>${data.name}</td>
                <td>
                    <button class="btn-delete" onclick="deleteStudent('${docData.id}')">ลบ</button>
                </td>
            </tr>
        `;
        studentList.innerHTML += row;
    });
});

// ฟังก์ชันลบข้อมูล (ต้องประกาศไว้ให้เรียกใช้จาก HTML ได้)
window.deleteStudent = async (id) => {
    if (confirm("ยืนยันการลบ?")) {
        await deleteDoc(doc(db, "students", id));
    }
};
