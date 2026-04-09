import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
dotenv.config();
import path from "path";
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  }),
);
app.use(express.json());
app.use("/api/auth", authRoutes);

// --- STATIC FILES FOR DEPLOYMENT ---
if (process.env.NODE_ENV === "production") {
  // 1. Static files serve karein (frontend folder se)
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // 2. Kisi bhi non-API route par index.html bhejien
  app.get("(.*)", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
}
// -----------------------------------

app.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
  connectDB();
});
