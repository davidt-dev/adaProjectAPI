
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BakerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    }
});

const Baker = mongoose.model('baker',BakerSchema);

module.exports = Baker; 