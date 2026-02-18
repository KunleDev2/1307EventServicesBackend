const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { encrypt, decrypt } = require("./crypto");
const { sendContactEmail } = require("./emailService");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

function sanitize(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

app.post("/api/contact", async (req, res) => {
    console.log("before sending", req.body);

    try {
        let { name, email, eventDate, inquiry, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields required" });
        }

        name = sanitize(name);
        email = sanitize(email);
        eventDate = sanitize(eventDate);
        message = sanitize(message);
        inquiry = sanitize(inquiry);

        await sendContactEmail({ name, email, eventDate, inquiry, message });

        res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send messag" });
    }
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;
    console.log("before chat try...", process.env.PYTHON_API_URL);

        if (!message) {
            return res.status(400).json({ error: "Message required" });
        }

        const pythonResponse = await axios.post(`${process.env.PYTHON_API_URL}/chat`,
            { question: message }
        );

        res.json({
            reply: pythonResponse.data.answer
        });
    } catch (error) {
        console.error("Chat error:", error.message);
        res.status(500).json({
            reply: "Apologies, I'm currently unavailable. Please try again shortly."
        });
    }
})

app.listen(5000, () => {
    console.log("Secure server running on port 5000");
})