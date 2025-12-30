require("dotenv").config();

const express = require("express");
const cors = require("cors");

const simulateLife = require("./engine/lifeEngine");
const countries = require("./data/countries.json");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/**
 * Get all supported countries
 * Frontend will use this → NO hardcoding
 */
app.get("/countries", (req, res) => {
  res.json(Object.keys(countries));
});

/**
 * Main simulation endpoint
 */
app.post("/simulate", async (req, res) => {
  try {
    const result = await simulateLife(req.body);
    res.json(result);
  } catch (error) {
    console.error("SIMULATION ERROR:", error.message);
    res.status(400).json({
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
