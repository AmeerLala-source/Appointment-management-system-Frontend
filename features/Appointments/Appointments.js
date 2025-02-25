
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../auth/Login.html";
    }
});

document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const token = localStorage.getItem("token"); 

    const specialist = document.getElementById("specialist").value;
    const date = document.getElementById("date").value;
    const hour = document.getElementById("hour").value;

    if (!specialist || !date || !hour) {
        alert("Please fill in all fields.");
        return;
    }

    const dateTime = new Date(`${date}T${hour}:00.000Z`).toISOString();
    const appointmentData = {
        medicalField: specialist,
        dateTime: dateTime
    };

    try {
        const response = await fetch("http://localhost:5000/api/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData)
        });

        const data = await response.json(); 

        if (response.ok) {
            alert("✅ Appointment booked successfully!");
            window.location.href = `AppointmentDetails.html?id=${data.appointment._id}`;
        } else {
            alert(`❌ Failed to book appointment: ${data.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error booking appointment.");
    }
});
