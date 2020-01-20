const mongoose = require('mongoose');
const App = mongoose.model('App');

exports.list = (req, res) => {
    App.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
};
