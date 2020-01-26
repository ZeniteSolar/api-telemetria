const mongoose = require('mongoose');

const ModuleInfo = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('ModuleInfo', ModuleInfo);