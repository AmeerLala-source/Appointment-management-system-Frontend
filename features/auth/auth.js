const API_URL = "http://localhost:5000/api/auth"; // Define your backend API URL

// 📌 Register User
async function register(event) {
    event.preventDefault(); // Prevents page reload

    // Get form values
    let username = document.getElementById("register-username").value.trim();
    let email = document.getElementById("register-email").value.trim();
    let password = document.getElementById("register-password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();

    // Validate if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address!");
        return;
    }

    // Check if password meets length criteria
    if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: username, email, password }), // Corrected request body
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Registration failed");

        alert("✅ Registration successful! You can now log in.");
        window.location.href = "login.html";
    } catch (error) {
        alert("❌ " + error.message);
    }
}

// 📌 Login User
async function login(event) {
    event.preventDefault(); // Prevents page reload

    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("password").value.trim();

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        // Store the token in localStorage
        localStorage.setItem("token", data.token);

        alert(`✅ Login successful! Welcome`);
        window.location.href = "../Appointments/Appointments.html";
    } catch (error) {
        alert("❌ " + error.message);
    }
}


document.getElementById("register-form")?.addEventListener("submit", register);
document.getElementById("login-form")?.addEventListener("submit", login);
