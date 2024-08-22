import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./Database/dbConnection.js";
import userRouter from "./Routes/userRoutes.js";
import companyRouter from "./Routes/companyRoutes.js";
import jobRouter from "./Routes/jobRoutes.js";
import applicationRouter from "./Routes/applicationRoutes.js";
import path from "path";

const app = express();

// Middleware
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

dotenv.config({
  path: ".env",
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"))
})

dbConnection();

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

export default app;
