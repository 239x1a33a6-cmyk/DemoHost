// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // dynamic port for Render

// ✅ Enable CORS for all origins (frontend can be anywhere)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ Test route to check server status
app.get("/", (req, res) => {
    res.send("Hi team E-Forest(VVVVVVV)");
});

// ✅ Calculator API
app.post("/calculate", (req, res) => {
    const { num1, num2, operator } = req.body;

    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return res.status(400).json({ error: "Invalid input numbers" });
    }

    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                return res.status(400).json({ error: "Cannot divide by zero" });
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: "Invalid operator" });
    }

    res.json({ result });
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
