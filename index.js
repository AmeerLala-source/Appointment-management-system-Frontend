document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token"); 

    if (token) {
        fetch("https://your-backend.com/api/validate-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                window.location.href = "./features/Appointments/Appointments.html";
            } else {
                localStorage.removeItem("token"); 
                window.location.href = "./features/auth/Login.html";
            }
        })
        .catch(() => {
            localStorage.removeItem("token"); 
            window.location.href = "./features/auth/Login.html"; 
        });
    } else {
        console.log("User not authenticated");
    }
});
