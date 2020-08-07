const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        default: "No Text Entered!"
    },
    timestamp: {
        type: Date,
        required: true,
        default: new Date()
    }
});

module.exports = mongoose.model('Note', NoteSchema)