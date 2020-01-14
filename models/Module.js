const mongoose = require('mongoose');

const ModuleSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    signature: {
        type: Number
    },
    date_on_mongo: {
        type: Date,
        default: Date.now
    }
});

// Exemple register
var exemple = {
	"name": "MIC19",
	"description": "Modulo de Interface de Controle",
	"signature": 240
}

module.exports = mongoose.model('Module', ModuleSchema);