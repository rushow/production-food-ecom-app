import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import openaiRoutes from "./routes/openaiRoutes.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";

// configure env
dotenv.config();

// database config
connectDB();

//es module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// rest  object
const app = express()

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/openai", openaiRoutes);

//rest api
// app.get('/', (req, res) => {
//     res.send('<h1>welcome to Healthy Food E-commerce App</h1>')
// });
app.use("*", function (req, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// PORT
const PORT = process.env.PORT || 8080;

// MODE
const DEV_MODE = process.env.DEV_MODE;

// run listen
app.listen(PORT, () => {
    console.log(`Server is Running on ${DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
