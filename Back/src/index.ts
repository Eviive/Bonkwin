import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { router } from "./routes";
import { connection } from "./config/database";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

try {
    connection();

    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
} catch (error) {
    console.error(error);
}
