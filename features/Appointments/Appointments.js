const API_URL = "https://appointment-management-system-backend.onrender.com/api/appointments";

// Disable today's date and previous dates
document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");

    // Get tomorrow's date in YYYY-MM-DD format
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Add one day to today's date

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(tomorrow.getDate()).padStart(2, "0"); // Add leading zero if needed
    const minDate = `${year}-${month}-${day}`;

    // Set the minimum date for the input field
    dateInput.setAttribute("min", minDate);
});

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Retrieve form values
    const token = localStorage.getItem("token");
    const specialist = document.getElementById("specialist").value;
    const date = document.getElementById("date").value;
    const hour = document.getElementById("hour").value;

    // Basic validation: Ensure all fields are filled
    if (!specialist || !date || !hour) {
        alert("Please fill in all fields.");
        return;
    }

    // Convert the selected date and time into a Date object
    const selectedDateTime = new Date(`${date}T${hour}:00.000Z`);

    
    // Format the selected date and time as an ISO string for the API
    const dateTime = selectedDateTime.toISOString();

    // Prepare the appointment data
    const appointmentData = {
        medicalField: specialist,
        dateTime: dateTime,
    };

    try {
        // Send the appointment data to the server
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(appointmentData),
        });

        // Parse the response
        const data = await response.json();

        // Handle success or failure
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