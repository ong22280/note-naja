import express from "express";
import authRouter from "./routes/authRouter";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter";
import { authenticate } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import logRouter from "./routes/logRouter";
import noteRouter from "./routes/noteRouter";
import tagRouter from "./routes/tagRouter";

dotenv.config();

interface UserBasicInfo {
  id: number;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  express.static("../uploads")
)

app.use(bodyParser.json()); // To recognize the req obj as a json obj
app.use(bodyParser.urlencoded({ extended: true })); // To recognize the req obj as strings or arrays. extended true to handle nested objects also

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(authRouter);
app.use("/users", authenticate, userRouter);
app.use("/logs", authenticate, logRouter);
app.use("/notes", authenticate, noteRouter);
app.use("/tags", authenticate, tagRouter);

app.use(errorHandler);