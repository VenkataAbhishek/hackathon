/*
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");


const gemini = new GoogleGenerativeAI("AIzaSyBemcRxpLbXAmt9rKKSqnULzASZP8YWdt8");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
    try {

        const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent([prompt]);

        const responseText = result.response.candidates[0]?.content.parts[0]?.text || "No response received.";

        res.json({ response: responseText });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to process request", details: error.message });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
*/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini = new GoogleGenerativeAI("AIzaSyBemcRxpLbXAmt9rKKSqnULzASZP8YWdt8"); // Make sure this API key is valid

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    
    console.log("Raw Gemini API Response:", JSON.stringify(result, null, 2)); // ✅ Debugging output

    if (!result.response || !result.response.candidates) {
      throw new Error("Invalid Gemini API response.");
    }

    const text = result.response.candidates[0]?.content?.parts[0]?.text || "No response received.";

    res.json({ response: text });
  } catch (error) {
    console.error("🔥 Gemini API Error:", error);
    res.status(500).json({ error: "Failed to process request", details: error.message });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
