 function logout() {
    localStorage.removeItem("token");
    alert("✅ You have been logged out.");
    window.location.href = `${window.location.origin}/features/auth/Login.html`;
}

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});
