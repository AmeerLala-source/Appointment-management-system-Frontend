document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent form from submitting the default way
    
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const specialist = document.getElementById("specialist").value;
    const message = document.getElementById("message").value;

    // Validate if all fields are filled
    if (!name || !email || !specialist || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Display a success message (you can integrate an actual form submission here)
    alert(`Thank you, ${name}. Your message has been sent to the ${specialist} specialist.`);

    // Clear the form
    document.getElementById("contactForm").reset();
});
