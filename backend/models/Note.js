const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        default: "No Text Entered!"
    }
});

module.exports = mongoose.model('Note', NoteSchema)