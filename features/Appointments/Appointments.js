const API_URL = "https://appointment-management-system-backend.onrender.com/api/appointments";

document.querySelector("form").addEventListener("submit", async function(event) {
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

    // Get the current date and time
    const currentDateTime = new Date();

    // Ensure the selected date is in the future
    if (selectedDateTime <= currentDateTime) {
        alert("❌ You can only book appointments for future dates and times.");
        return;
    }

    // Format the selected date and time as an ISO string for the API
    const dateTime = selectedDateTime.toISOString();

    // Prepare the appointment data
    const appointmentData = {
        medicalField: specialist,
        dateTime: dateTime
    };

    try {
        // Send the appointment data to the server
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData)
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
