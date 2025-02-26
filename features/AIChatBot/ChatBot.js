document.getElementById("appointment-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Your appointment has been booked!");
});

// AI Chat Interaction
async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user message
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    // Send request to backend
    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        chatBox.innerHTML += `<p><strong>AI:</strong> ${data.response[0]?.generated_text || "I'm not sure. Please consult a doctor."}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<p><strong>AI:</strong> Error connecting to AI</p>`;
    }
}
