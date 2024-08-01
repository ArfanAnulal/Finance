import mongoose from 'mongoose';
const recordSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    amount: String,
    category: String,
    date: Date,
    description: String,
});
const Record = mongoose.model('Record', recordSchema);
export default Record;