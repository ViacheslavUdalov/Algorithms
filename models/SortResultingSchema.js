import mongoose from 'mongoose';

const AlgorithmsSchema = new mongoose.Schema({
    id: { type: String, required: false },
    sortType: { type: String, required: true },
    arraySize: { type: Number, required: true },
    times: {
        random: { type: String, required: true },
        sorted: { type: String, required: true },
        reversed: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now }
});

const Algorithm = mongoose.model('Algorithm', AlgorithmsSchema);

export default Algorithm
