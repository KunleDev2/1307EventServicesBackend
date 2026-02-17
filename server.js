const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { encrypt, decrypt } = require("./crypto");
const { sendContactEmail } = require("./emailService");

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
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields required" });
        }

        name = sanitize(name);
        email = sanitize(email);
        message = sanitize(message);

        await sendContactEmail({ name, email, message });

        res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send messag" });
    }
});

app.listen(5000, () => {
    console.log("Secure server running on port 5000");
})