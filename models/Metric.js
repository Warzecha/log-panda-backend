const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    appName: {
        type: String
    },
    path: {
        type: String
    },

    totalRequestCount: {
        type: Number
    },
    clientErrorCount: {
        type: Number
    },
    serverErrorCount: {
        type: Number
    },
    successfulRequestsCount: {
        type: Number
    },


    timestamp: {
        type: Number
    },

    elapsedTime50: {
        type: Number
    },
    elapsedTime90: {
        type: Number
    },
    elapsedTime95: {
        type: Number
    },
    elapsedTime99: {
        type: Number
    },
});

mongoose.model('Metric', schema);