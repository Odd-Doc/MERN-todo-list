import mongoose from "mongoose"
const { Schema } = mongoose;
const toDoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: String,
        default: Date.now()

    }
});

const ToDo = new mongoose.model("mern-todos", toDoSchema);

export { ToDo };