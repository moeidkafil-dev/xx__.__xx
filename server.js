<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Matrix Hacker Dashboard</title>
<style>
body { margin: 0; padding: 0; background: black; font-family: monospace; overflow: hidden; }
#main-box {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 600px; height: 400px; border: 3px solid #00ff00;
  padding: 20px; box-sizing: border-box; color: #00ff00;
  background-color: rgba(0,0,0,0.7); overflow-y: auto; font-size: 18px;
}
canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
#main-box span.blink { color:red; animation:blink 0.7s infinite; font-size:28px; font-weight:bold; }
</style>
</head>
<body>

<canvas id="matrix"></canvas>

<div id="main-box">
  <div id="keys">Waiting for data...</div>
  <span class="blink">!</span>
</div>

<script>
// افکت ماتریکسی
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#0F0"; 
  ctx.font = fontSize + "px monospace";
  for(let i=0;i<drops.length;i++){
    const text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  }
}
setInterval(draw,50);

// دریافت داده‌ها و نمایش
async function fetchKeys() {
  try {
    const res = await fetch("/api/send_keys");
    const data = await res.json();
    document.getElementById('keys').textContent = data.join('\n');
  } catch(e) {
    console.log("Server not ready yet.");
  }
}
setInterval(fetchKeys,1000);
</script>

</body>
</html>
