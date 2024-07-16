import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
console.log(process.env.DB_URI);


const app = express();

app.use(express.json());
app.use(cors());

