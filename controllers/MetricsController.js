// const mongoose = require('mongoose');
// const Log = mongoose.model('Log');
// const App = mongoose.model('App');

const {scan} = require('../services/MetricsService');

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
