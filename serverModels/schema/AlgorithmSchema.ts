import mongoose from "mongoose";

const AlgorithmsSchema = new mongoose.Schema({
    // _id: { type: String, required: false },
    sortType: { type: String, required: true },
    arraySize: { type: Number, required: false },
    times: {
        random: { type: String, required: false },
        sorted: { type: String, required: false },
        reversed: { type: String, required: false },
    },
    status: { type: String, required: true },
    isValid: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Algorithm = mongoose.model('Algorithm', AlgorithmsSchema);

export default Algorithm
