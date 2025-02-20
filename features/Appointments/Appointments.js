document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

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

    const token = localStorage.getItem("token"); // Retrieve auth token

    try {
        const response = await fetch("http://localhost:5000/api/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData)
        });

        const data = await response.json(); // Get response JSON

        if (response.ok) {
            alert("✅ Appointment booked successfully!");

            // Redirect to the appointment details page with the appointment ID
            window.location.href = `AppointmentDetails.html?id=${data.appointment._id}`;
        } else {
            alert(`❌ Failed to book appointment: ${data.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error booking appointment.");
    }
});
