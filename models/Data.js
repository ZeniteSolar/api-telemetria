const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({

    date: {
        type: String,
        require: true
    },
    mod: {
        type: Number,
        require: true
    },
    top: {
        type: Number,
        require: true
    },
    bytes: [ String ],
    dalay: {
        type: Number
    }
});

module.exports = mongoose.model('Log', DataSchema);