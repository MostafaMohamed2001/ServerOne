const express = require("express");
const { JSONRPCServer } = require("json-rpc-2.0");

const app = express();
app.use(express.json());

const server = new JSONRPCServer();

// بيانات المستخدمين
const usersBalance = {
  "user_1": 500,
  "user_2": 1200,
  "user_3": 750,
};

// دالة إرجاع الرصيد
server.addMethod("getBalance", ({ userId }) => {
  console.log(`📩 Received request for balance of userId: ${userId}`);
  const balance = usersBalance[userId] || "User not found";
  console.log(`📤 Response: ${balance}`);
  return balance;
});

// نقطة نهاية JSON-RPC
app.post("/rpc", (req, res) => {
  console.log("🔹 Incoming JSON-RPC Request:", req.body);
  server.receive(req.body).then((jsonRPCResponse) => {
    // console.log("🔹 JSON-RPC Response:", jsonRPCResponse);
    res.json(jsonRPCResponse);
  });
});

app.get("/view", (req,res)=>{
  res.sendFile(__dirname + "/index.html");
})

// تشغيل السيرفر
app.listen(3000, () => {
  console.log("✅ JSON-RPC Server running on port 3000");
});