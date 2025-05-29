import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

const allowedOrigins = [
  // "http://localhost:5500",
  // "http://127.0.0.1:5500",
  "https://notes-be-1013759214686.us-central1.run.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `Origin ${origin} tidak diizinkan oleh CORS`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world")
});

app.use("/api", UserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server connected on port ${PORT}`));