const apiBaseUrl = "http://localhost:5000/api/ai";

let userId = localStorage.getItem("userId");

function sendMessage() {
    const userInput = document.getElementById("user-input").value;

    if (!userInput) return;

    const chatContainer = document.getElementById("chat-history");

    // Add user message to chat history
    const userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.textContent = `User: ${userInput}`;
    chatContainer.appendChild(userMessage);

    // Simulate the response from the backend with fake data
    setTimeout(() => {
        const fakeData = {
            response: "",
            userId: userId || "fakeUser123",
        };

        if (!userId && fakeData.userId) {
            userId = fakeData.userId;
            localStorage.setItem("userId", userId);
        }

        // Check if the user input is "I have a headache"
        if (userInput.toLowerCase() === "i have a headache") {
            fakeData.response = "I'm sorry you're experiencing that! Please answer these questions to help me understand better.";
        } else {
            fakeData.response = "AI: Sorry, I don't understand this illness.";
        }

        if (fakeData.response) {
            const assistantMessage = document.createElement("div");
            assistantMessage.classList.add("ai-message");
            assistantMessage.textContent = `AI: ${fakeData.response}`;
            chatContainer.appendChild(assistantMessage);

            // If the response is about headache, ask for more info
            if (userInput.toLowerCase() === "i have a headache") {
                displayOptions(chatContainer);
            }
        } else {
            const errorMessage = document.createElement("div");
            errorMessage.classList.add("ai-message");
            errorMessage.textContent = "AI: Sorry, I couldn't process that request. Please try again.";
            chatContainer.appendChild(errorMessage);
        }

        // Scroll to the bottom of chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;

        document.getElementById("user-input").value = "";
    }, 500);
}

function displayOptions(chatContainer) {
    // Display the question for severity
    const severityQuestion = document.createElement("div");
    severityQuestion.classList.add("ai-message");
    severityQuestion.textContent = "AI: Choose the level of pain:";
    chatContainer.appendChild(severityQuestion);

    // Create a dropdown for severity
    const severityDropdown = document.createElement("select");
    severityDropdown.innerHTML = `
        <option value="slight">Slight</option>
        <option value="moderate">Moderate</option>
        <option value="severe">Severe</option>
    `;
    chatContainer.appendChild(severityDropdown);

    // Display the question for location
    const locationQuestion = document.createElement("div");
    locationQuestion.classList.add("ai-message");
    locationQuestion.textContent = "AI: Where do you feel the pain?";
    chatContainer.appendChild(locationQuestion);

    // Create a dropdown for location
    const locationDropdown = document.createElement("select");
    locationDropdown.innerHTML = `
        <option value="front">Front</option>
        <option value="back">Back</option>
        <option value="sides">Sides</option>
    `;
    chatContainer.appendChild(locationDropdown);

    // Add a submit button for final recommendation
    const submitButton = document.createElement("button");
    submitButton.textContent = "Get Final Recommendation";

    submitButton.onclick = function () {
        const severity = severityDropdown.value;
        const location = locationDropdown.value;

        let recommendationMessage;

        // // Logic for recommendation based on severity and location
        // if (severity === "slight" && location === "front") {
        //     recommendationMessage = "AI: It seems like you have a slight headache at the front of your head. We recommend you rest and stay hydrated.";
        // } else if (severity === "moderate" && location === "back") {
        //     recommendationMessage = "AI: You have a moderate headache at the back of your head. We recommend you see a neurologist.";
        // } else if (severity === "severe" && location === "sides") {
        //     recommendationMessage = "AI: You have a severe headache at the sides of your head. It might be best to consult with a healthcare professional.";
        // } else {
        //     recommendationMessage = "AI: Based on your input, it's best to monitor your symptoms and consult a healthcare provider if necessary.";
        // }
        // Logic for recommendation based on severity and location
        let specialistRecommendation;

        if (severity === "slight") {
            if (location === "front") {
                recommendationMessage = "AI: It seems like you have a slight tension headache at the front of your head. We recommend resting in a quiet, dark room and staying hydrated. Over-the-counter pain relievers like ibuprofen may help.";
                specialistRecommendation = "If the headache persists, consider consulting a General Practitioner (GP) for further evaluation.";
            } else if (location === "back") {
                recommendationMessage = "AI: You might be experiencing a slight tension headache at the back of your head. Try applying a warm compress to the area and practicing relaxation techniques like deep breathing.";
                specialistRecommendation = "If the pain continues, a Physical Therapist may help assess any neck-related issues.";
            } else if (location === "sides") {
                recommendationMessage = "AI: This could be a mild migraine or tension headache on the sides of your head. Rest in a calm environment, avoid bright lights, and consider drinking water or herbal tea.";
                specialistRecommendation = "For recurring migraines, consult a Neurologist for specialized care.";
            }
        } else if (severity === "moderate") {
            if (location === "front") {
                recommendationMessage = "AI: You may be experiencing a moderate tension headache at the front of your head. Consider taking over-the-counter pain relievers and avoiding stress triggers.";
                specialistRecommendation = "If the headache doesn't improve, schedule an appointment with a General Practitioner (GP).";
            } else if (location === "back") {
                recommendationMessage = "AI: A moderate headache at the back of your head could indicate tension or occipital neuralgia. Apply a warm compress, stretch your neck gently, and monitor your symptoms.";
                specialistRecommendation = "A Physical Therapist or Neurologist may help diagnose and treat underlying causes.";
            } else if (location === "sides") {
                recommendationMessage = "AI: This might be a moderate migraine or cluster headache on the sides of your head. Use cold compresses, stay hydrated, and avoid loud noises.";
                specialistRecommendation = "For persistent migraines, consult a Neurologist for a detailed evaluation.";
            }
        } else if (severity === "severe") {
            if (location === "front") {
                recommendationMessage = "AI: A severe headache at the front of your head could indicate a serious condition like a migraine or sinus infection.";
                specialistRecommendation = "Please consult an ENT Specialist (for sinus issues) or a Neurologist immediately.";
            } else if (location === "back") {
                recommendationMessage = "AI: Severe pain at the back of your head may suggest a serious issue such as a cervicogenic headache or even a neurological condition.";
                specialistRecommendation = "Seek urgent medical attention from a Neurologist or Physical Therapist to rule out complications.";
            } else if (location === "sides") {
                recommendationMessage = "AI: Severe pain on the sides of your head could indicate a migraine or other serious conditions like temporal arteritis.";
                specialistRecommendation = "Please see a Neurologist as soon as possible for proper diagnosis and treatment.";
            }
        }

        // Default message if no specific recommendation matches
        if (!recommendationMessage) {
            recommendationMessage = "AI: Based on your input, it's best to monitor your symptoms closely. If the headache persists or worsens, consult a healthcare provider for further evaluation.";
            specialistRecommendation = "A General Practitioner (GP) is a good starting point for most headaches.";
        }

        // Combine the recommendation and specialist advice
        const fullRecommendation = `${recommendationMessage} ${specialistRecommendation}`;

        // Create a new div for the assistant's recommendation message
        const assistantMessage = document.createElement("div");
        assistantMessage.classList.add("ai-message");
        assistantMessage.textContent = fullRecommendation;
        chatContainer.appendChild(assistantMessage);

        // Scroll to the bottom of chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Hide the "Get Final Recommendation" button after it's clicked
        submitButton.style.display = "none"; // This hides the button after the recommendation is shown
    };

    // Append the submit button to the container
    chatContainer.appendChild(submitButton);
}

function getChatHistory() {
    let userId = localStorage.getItem("userId");
    console.log("Fetching chat history for userId:", userId);  // Log the userId

    if (userId) {
        fetch(`${apiBaseUrl}/chat/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Received chat history:", data);  // Log the received data

                const chatHistoryContainer = document.getElementById("chat-history-list");
                chatHistoryContainer.innerHTML = "";  // Clear previous chat history

                if (data && data.history && data.history.length > 0) {
                    // Iterate through chat history and add messages
                    data.history.forEach((chat) => {
                        const chatMessage = document.createElement("div");
                        chatMessage.classList.add(chat.sender === "user" ? "user-message" : "ai-message");
                        chatMessage.textContent = `${chat.sender}: ${chat.message}`;
                        chatHistoryContainer.appendChild(chatMessage);
                    });
                } else {
                    chatHistoryContainer.innerHTML = "No history found.";  // If no history exists
                }
            })
            .catch(err => {
                console.error('Error fetching chat history:', err);
            });
    } else {
        console.error('No user ID found.');  // Handle case when userId is not set
    }
}
