import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import bodyParser from 'body-parser'
import connectdb from './connecctdb.js';
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL


//database connection
connectdb(DATABASE_URL);

//pass the json data
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server listening on http://localhost:${port}`)
})