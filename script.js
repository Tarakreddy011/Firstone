document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('video');

    video.addEventListener('error', () => {
        console.warn('Video failed to load. Displaying fallback image.');
    });
});

// ------------------ Chatbot Logic ------------------
document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    chatbotToggle.addEventListener("click", () => {
        chatbotWindow.style.display = "block";
    });

    chatbotClose.addEventListener("click", () => {
        chatbotWindow.style.display = "none";
    });

    function appendMessage(message, type) {
        const div = document.createElement("div");
        div.classList.add("message", `${type}-message`);
        div.textContent = message;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function handleSend() {
        const text = chatbotInput.value.trim();
        if (!text) return;
        appendMessage(text, "user");
        chatbotInput.value = "";

        // Simulated bot response
        setTimeout(() => {
            appendMessage(`Thanks for asking about "${text}". We'll get back to you soon!`, "bot");
        }, 600);
    }

    chatbotSend.addEventListener("click", handleSend);
    chatbotInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleSend();
    });
});

// ------------------ Back to Top Button ------------------
window.addEventListener("scroll", () => {
    const backToTopButton = document.getElementById("back-to-top");
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

document.getElementById("back-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
// ------------------ Video Fallback ------------------
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('video');

    video.addEventListener('error', () => {
        console.warn('Video failed to load. Displaying fallback image.');
        const fallbackImage = document.createElement('img');
        fallbackImage.src = 'fallback.jpg'; // Replace with your fallback image path
        fallbackImage.alt = 'Fallback Image';
        video.parentNode.replaceChild(fallbackImage, video);
    });
});
// ------------------ Video Fallback ------------------

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const chatbotWindow = document.getElementById('chatbot-window');
    const sendBtn = document.getElementById('chatbot-send');
    const inputField = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');

    // Toggle Chatbot
    toggleBtn.addEventListener('click', () => {
        chatbotWindow.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });

    // Send Message Function
    async function sendMessage() {
        const userMessage = inputField.value.trim();
        if (!userMessage) return;

        // Append user message
        appendMessage(userMessage, 'user');

        inputField.value = '';
        inputField.disabled = true;
        sendBtn.disabled = true;

        // Send to backend
        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            appendMessage(data.reply || "No response", 'bot');
        } catch (error) {
            console.error('Error:', error);
            appendMessage("Something went wrong. Please try again.", 'bot');
        } finally {
            inputField.disabled = false;
            sendBtn.disabled = false;
        }
    }

    // Append Message to Chat Window
    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Event Listeners
    sendBtn.addEventListener('click', sendMessage);

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
