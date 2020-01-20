const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const App = mongoose.model('App');


exports.create = async (toCreate) => {

    App.findOne({name: toCreate.appName}).exec()
        .then(app => {

            if (app) {
                console.log("Found app", app);
                return Log.create(toCreate)
            } else {
                console.log("App not found", app);

                // maybe return the promise
                App.create({name: toCreate.appName})
                    .then((createdApp) => {
                        console.log("Created app", createdApp);
                        return Log.create(toCreate)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }


        })
        .catch(err => {
            console.log("Error", err)
        })
};

exports.find = (query) => {
    const {
        startTimestamp,
        endTimestamp,
        path
    } = query || {};

    const conditions = {
        timestamp: {
            $gte: startTimestamp || Number.MIN_VALUE,
            $lte: endTimestamp || Number.MAX_VALUE
        },
        path: path || /.*/


    };

    return Log.find(conditions).exec()


};