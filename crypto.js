const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = crypto.createHash("sha256").update("api_key").digest();

function encrypt(text) {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");

    return {
        iv: iv.toString("base64"),
        content: encrypted
    };
}

function decrypt(encryptedData) {
    const iv = Buffer.from(encryptedData.iv, "base64");
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    let decrypted = decipher.update(
        encryptedData.content,
        "base64",
        "utf8"
    );

    decrypted += decipher.final("utf8");

    return decrypted
}

module.exports = { encrypt, decrypt};