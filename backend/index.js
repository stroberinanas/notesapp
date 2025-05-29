import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "https://h-08-451505.uc.r.appspot.com",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://h-08-451505.uc.r.appspot.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // ← ini penting untuk preflight
  }
  next();
});

app.use(express.json());


app.get("/", (req, res) => {
  res.send("hello world")
});

app.use("/api", UserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server connected on port ${PORT}`));