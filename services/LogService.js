const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const App = mongoose.model('App');


exports.create = async (toCreate) => {

    try {

        const filter = {name: toCreate.appName};
        const update = {name: toCreate.appName, maxRpm: toCreate.maxRpm};

        let app = await App.findOneAndUpdate(filter, update);

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