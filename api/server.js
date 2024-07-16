import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';



const app = express();

app.use(express.json());
app.use(cors());

