const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    appName: {
        type: String
    },
    method: {
        type: String
    },
    path: {
        type: String
    },
    elapsedTime: {
        type: Number
    },
    timestamp: {
        type: Number
    },
    statusCode: {
        type: Number
    },
    statusMessage: {
        type: String
    },
});

mongoose.model('Log', schema);