// const mongoose = require('mongoose');
// const Log = mongoose.model('Log');
// const App = mongoose.model('App');

const {scan, find} = require('../services/MetricsService');

exports.scan = (req, res) => {
    scan()
        .then(data => {
            console.log("Scanned", data);
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
};


exports.list = async (req, res) => {
    try {
        const metrics = await find(req.query);
        console.log("Tutaj", metrics);
        res.json(metrics)
    } catch (err) {
        res.status(500).json(err)
    }
};