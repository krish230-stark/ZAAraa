async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value;

    addMessage("You: " + message);

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    addMessage("AI: " + data.reply);

    speak(data.reply); // TTS
    input.value = "";
}

function addMessage(msg) {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += "<p>" + msg + "</p>";
}

// 🎤 Speech to Text
function startVoice() {
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
        document.getElementById("userInput").value =
            event.results[0][0].transcript;
    };
    recognition.start();
}

// 🔊 Text to Speech
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}