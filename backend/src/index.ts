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
import favoriteRouter from "./routes/favoriteRouter";

dotenv.config();

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(authRouter);
app.use("favorites", authenticate, favoriteRouter);
app.use("/logs", authenticate, logRouter);
app.use("/notes", authenticate, noteRouter);
app.use("/tags", authenticate, tagRouter);
app.use("/users", authenticate, userRouter);

app.use(errorHandler);