const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Store simple user progress (in-memory)
let userProfile = {
    level: "beginner",
    score: 0
};

// API Route
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    // Domain restriction
    const systemPrompt = `
You are an AI Language Tutor.
- Only help in language learning.
- If user asks anything else, reply: "I can only help with language learning."
- Teach according to ${userProfile.level} level.
- Give examples and small quizzes.
`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        res.json({ reply });

    } catch (err) {
        res.status(500).send("Error");
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));