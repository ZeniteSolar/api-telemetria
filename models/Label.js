const mongoose = require('mongoose');

const LabelSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    date:{
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('label', LabelSchema);