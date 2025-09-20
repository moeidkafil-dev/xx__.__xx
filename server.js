let keysData = []; // ذخیره کلیدها

export default function handler(req, res) {
  if(req.method === "POST") {
    const { keys } = req.body;
    if(keys) {
      keysData.push(keys);
    }
    res.status(200).json({status: "ok"});
  } 
  else if(req.method === "GET") {
    res.status(200).json(keysData);
  } 
  else {
    res.status(405).json({status: "error", message: "Method not allowed"});
  }
}
