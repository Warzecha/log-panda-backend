
const {create, find} = require('../services/LogService');

exports.create = (req, res) => {
    console.log(req.body)
    create(req.body)
        .then(createdLog => {
            console.log("Created", createdLog);
            res.json(createdLog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
};

exports.list = (req, res) => {
    find(req.query)
        .then(data => {
            res.json(data)

        })
        .catch(err => {
            res.status(500).json(err)
        })
};
