import mongoose from 'mongoose';

const AlgorithmsSchema = new mongoose.Schema({
    id: { type: String, required: false },
    sortType: { type: String, required: false },
    arraySize: { type: Number, required: false },
    times: {
        random: { type: String, required: false },
        sorted: { type: String, required: false },
        reversed: { type: String, required: false },
    },
    createdAt: { type: Date, default: Date.now }
});

const Algorithm = mongoose.model('Algorithm', AlgorithmsSchema);

export default Algorithm
