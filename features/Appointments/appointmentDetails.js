const API_URL = "http://localhost:5000/api/appointments";

// Function to fetch appointments from the backend
async function fetchAppointments() {
    try {
        const token = localStorage.getItem("token"); // Get token from storage

        if (!token) {
            alert("Unauthorized! Please log in.");
            window.location.href = "../auth/login.html"; // Redirect to login
            return;
        }

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Send token for authentication
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch appointments");

        displayAppointments(data); // Call function to display data
    } catch (error) {
        alert("❌ Error: " + error.message);
    }
}

// Function to display appointments in the table
function displayAppointments(appointments) {
    const tableBody = document.getElementById("appointments-list");
    tableBody.innerHTML = ""; // Clear previous entries

    if (appointments.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">No appointments found.</td></tr>`;
        return;
    }

    appointments.forEach(appointment => {
        const { _id, medicalField, dateTime } = appointment;
        const dateObj = new Date(dateTime);
        const formattedDate = dateObj.toLocaleDateString();
        const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const row = `
            <tr>
                <td>${medicalField}</td>
                <td>${formattedDate}</td>
                <td>${formattedTime}</td>
                <td><button class="cancel-btn" data-id="${_id}">Cancel</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    // Add event listeners to cancel buttons
    document.querySelectorAll(".cancel-btn").forEach(button => {
        button.addEventListener("click", cancelAppointment);
    });
}

// Function to cancel an appointment
async function cancelAppointment(event) {
    const appointmentId = event.target.getAttribute("data-id");
    
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/${appointmentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Failed to cancel appointment");

        alert("✅ Appointment cancelled successfully.");
        fetchAppointments(); // Refresh the appointment list
    } catch (error) {
        alert("❌ " + error.message);
    }
}

// Fetch appointments when the page loads
document.addEventListener("DOMContentLoaded", fetchAppointments);
