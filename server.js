// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // فرانت‌اند رو از همین پوشه سرو می‌کنیم

let logs = [];

// گرفتن لاگ‌ها برای نمایش در فرانت‌اند
app.get("/api/send_keys", (req, res) => {
  res.json(logs);
});

// ارسال داده‌ها از کلاینت یا هر منبع دیگه
app.post("/api/send_keys", (req, res) => {
  const { text } = req.body;
  if (text) {
    logs.push(text);
    if (logs.length > 50) logs.shift(); // حداکثر 50 خط نگه می‌داریم
    return res.json({ status: "ok" });
  }
  res.status(400).json({ status: "error", message: "no text provided" });
});

// پاک کردن لاگ‌ها (اختیاری)
app.post("/api/clear", (req, res) => {
  logs = [];
  res.json({ status: "cleared" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
