import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.routes.js";
import errorHandlingMiddleware from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandlingMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));