const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const App = mongoose.model('App');

const {find} = require('../services/LogService');


const MINUTE = 3600_000;

exports.schedule = () => {

    return setInterval(scan, MINUTE)
};

const scan = async () => {

    const endTimestamp = Date.now();
    const startTimestamp = endTimestamp - MINUTE;

    const condition = {
        timestamp: {
            $gte: startTimestamp,
            $lte: endTimestamp
        },
    };

    try {
        let appList = await App.find().exec();

        let logList = await Log.find(condition).exec();

        Object.entries(groupByAppName(logList)).forEach(([appName, appLogs]) => {

            let errorRates = calculateErrorRates(appLogs)

        })






    } catch (e) {

    }

};

exports.scan = scan;

const groupByAppName = (logs) => {
    return logs.reduce((rv, x) => {
        (rv[x.appName] = rv[x.appName] || []).push(x);
        return rv;
    }, {});
};



