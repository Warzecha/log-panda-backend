const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String
    },
    maxRpm: {
        type: Number
    }
});

mongoose.model('App', schema);