const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const App = mongoose.model('App');


exports.create = async (toCreate) => {

    try {
        let app = await App.findOne({name: toCreate.appName}).exec();

        if (!app) {
            console.log("App not found", app);
            app = await App.create({name: toCreate.appName});
            console.log("Created app", app);
        }

        return await Log.create(toCreate);
    } catch (err) {
        console.log("Error", err)
    }
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