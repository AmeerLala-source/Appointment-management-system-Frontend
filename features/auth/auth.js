
// 📌 Register User
function register(event) {
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

    // Simulate registration (this would be replaced with actual backend logic)
    console.log("User registered:", { username, email, password });

    // Redirect to login page after successful registration
    alert("Registration successful!");
    window.location.href = "login.html";
}


//     try {
//         const response = await fetch(`${API_URL}/register`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, email, password, role }),
//         });

//         const data = await response.json();
//         if (!response.ok) throw new Error(data.message);

//         alert("✅ Registration successful! You can now log in.");
        
//         window.location.href = "login.html";
//     } catch (error) {
//         alert("❌ " + error.message);
//     }
// }



// 📌 Login User 
function login(event) {
    event.preventDefault(); // Prevents page reload
    
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Simulated login check (replace with real authentication)
    if (email === "user@example.com" && password === "password123") {
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

//     try {
//         const response = await fetch(`${API_URL}/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         // Check if the response is OK (status 200)
//         if (!response.ok) {
//             throw new Error(data.message || "Login failed");
//         }

//         // Store the token and role in localStorage
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role);

//         alert(`✅ Login successful! Welcome, ${data.role}`);

//         // Redirect based on the user role
//         if (data.role === "admin") {
//             window.location.href = "coursesPage.html";
//         } else if (data.role === "instructor") {
//             window.location.href = "coursesPage.html";
//         } else {
//             window.location.href = "quiz.html";
//         }
//     } catch (error) {
//         alert("❌ " + error.message);
//     }
// }


