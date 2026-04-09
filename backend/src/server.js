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
    origin: true,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  }),
);
app.use(express.json());
app.use("/api/auth", authRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

 
// }

app.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
  connectDB();
});
