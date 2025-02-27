const API_URL = "https://appointment-management-system-backend.onrender.com/api/auth"; 

export  async function validateToken() {
    
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = `${window.location.origin}/features/auth/Login.html`; 
        return false;
    }

    try {
        const response = await fetch(`${API_URL}/validate-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok && data.valid) {
            return true;
        } else {
            localStorage.removeItem("token");
            window.location.href = `${window.location.origin}/index.html`;
            return false;
        }
    } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token");
        window.location.href = `${window.location.origin}/index.html`;
        return false;
    }
}