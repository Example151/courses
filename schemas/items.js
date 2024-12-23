const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: String,
    name: String,
    status: String
});

module.exports = mongoose.model('items', schema);