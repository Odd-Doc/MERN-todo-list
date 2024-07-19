import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ToDo } from './models/ToDo.js'

const uri = process.env.DB_URI;
const app = express();
const { Schema } = mongoose;
app.use(express.json());
app.use(cors());

mongoose.connect(uri);


app.get('/todos', async (req, res) => {
    const todos = await ToDo.find().lean();
    res.json(todos);
});


app.post('/todo/new', async (req, res) => {
    const todo = new ToDo({
        text: req.body.text
    })
    todo.save();
    res.json(todo)

});
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await ToDo.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await ToDo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})

app.listen(3001, () => { console.log("Server started on port 3001") })






