import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
//For Using Env File
import dotenv from 'dotenv';
//Routes
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
//Setting Limite For Datas Coming To Backend
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/user", userRoutes);
//Setting Server Port
const PORT = process.env.PORT || 5000;
//Connecting To Database
mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
    )
    .catch((error) => console.log(error.message));
