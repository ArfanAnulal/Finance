
import Record from '../models/Record.js';

export const add = async (req, res) => {

    const { amount, category, date, description } = req.body;

    const newRecord = new Record({
        userId: req.userId, // Associate the record with the user's ID
        amount,
        category,
        date: new Date(date),
        description,
    });

    newRecord.save()
        .then(() => res.send('Record saved successfully!'))
        .catch(err => res.status(400).send('Error saving record: ' + err));
}
export const view = async (req, res) => {
    Record.find({ userId: req.userId })
        .then(records => res.send(records))
        .catch(err => res.status(400).send('Error fetching records: ' + err));

}
export const update = async (req, res) => {
    const { id, amount, category, date, description } = req.body
    if(!id) return res.status(400).send('Record ID is required');
    Record.findByIdAndUpdate(id, {
        amount,
        category,
        date,
        description
    })
        .then(() => res.send('Record updated successfully!'))
        .catch(err => res.status(400).send('Error updating record: ' + err));
}
export const remove = async (req, res) => {
    const { id } = req.body;
    if(!id) return res.status(400).send('Record ID is required');
    Record.findByIdAndDelete(id)
        .then(() => res.send('Record deleted successfully!'))
        .catch(err => res.status(400).send('Error deleting record: ' + err));
}
