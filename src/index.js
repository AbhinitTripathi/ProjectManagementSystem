import dotenv from "dotenv";
import express from "express";
dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Running On PORT: ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});