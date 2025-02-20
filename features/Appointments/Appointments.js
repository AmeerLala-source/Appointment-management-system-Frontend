
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

    // Get token from localStorage or sessionStorage (assuming authentication is handled)
    const token = localStorage.getItem("token"); // Adjust if using a different storage method

    try {
        const response = await fetch("http://localhost:5000/api/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include auth token
            },
            body: JSON.stringify(appointmentData)
        });

        if (response.ok) {
            alert("Appointment booked successfully!");
        } else {
            const errorData = await response.json();
            alert(`Failed to book appointment: ${errorData.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error booking appointment.");
    }
});

