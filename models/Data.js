const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({

    ts: {
        type: Number,
        require: true
    },
    ts_u: {
        type: Number,
        require: true
    },
    ts_complete: {
        type: Number,
        require: true
    },
    data_time: {
        type: String,
        require: true
    },
    mod: {
        type: Number,
        require: true
    },
    info: {
        type: String,
        require: true
    },
    date_on_mongo: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Data', DataSchema);