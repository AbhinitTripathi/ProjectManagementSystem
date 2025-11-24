import express from "express";
import cors from "cors";

const app = express();

// CORS configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Basic Configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// import routes
import healthCheckRoute from "./controllers/healthcheck.controllers.js";
import authRouter from "./routes/auth.routs.js";

app.use("/api/v1/healthcheck", healthCheckRoute);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send(`Application Home`);
});

app.get("/instagram", (req, res) => {
  res.send(`This is your instagram Home Page`);
});

export default app;
