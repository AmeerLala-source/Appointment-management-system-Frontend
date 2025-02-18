//const API_URL = "http://localhost:3000/auth";

// 📌 Register User
async function register() {
    let name = document.getElementById("register-username").value.trim();
    let pid = document.getElementById("patient-id").value.trim();
    let password = document.getElementById("register-password").value.trim();
    

    if (!name || !pid || !password) {
        alert("All field are required");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        alert("✅ Registration successful! You can now log in.");
        
        window.location.href = "login.html";
    } catch (error) {
        alert("❌ " + error.message);
    }
}



// 📌 Login User & Redirect Based on Role
async function login() {
    let pid = document.getElementById("pid").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!pid || !password) {
        alert("נא להזין דוא״ל וסיסמה");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        // Store the token and role in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert(`✅ Login successful! Welcome, ${data.role}`);

        // Redirect based on the user role
        if (data.role === "admin") {
            window.location.href = "coursesPage.html";
        } else if (data.role === "instructor") {
            window.location.href = "coursesPage.html";
        } else {
            window.location.href = "quiz.html";
        }
    } catch (error) {
        alert("❌ " + error.message);
    }
}

