const mongoose = require('mongoose');
const {calculateElapsedTimeMetrics} = require("../utils/elapsedTimeUtils");
const {calculateErrorRates} = require("../utils/errorRateUtils");
const Log = mongoose.model('Log');
const Metric = mongoose.model('Metric');

// const MINUTE = 3600_000;
const MINUTE = 10_000;

exports.scheduleMetricsScan = () => {
    return setInterval(scan, MINUTE)
};

const scan = async () => {


    const endTimestamp = Date.now();
    const startTimestamp = endTimestamp - MINUTE;

    console.log("Perform scan at: ", new Date(endTimestamp));

    const condition = {
        timestamp: {
            $gte: startTimestamp,
            $lte: endTimestamp
        },
    };

    try {
        // let appList = await App.find().exec();
        let logList = await Log.find(condition).exec();

        let metrics = Object.entries(groupByAppName(logList)).map(([appName, appLogs]) => {

            let errorRatesMetrics = calculateErrorRates(appLogs);
            let elapsedTimeMetrics = calculateElapsedTimeMetrics(appLogs);

            return ({
                ...errorRatesMetrics,
                ...elapsedTimeMetrics,
                timestamp: endTimestamp,
                appName: appName
            })
        });

        await Metric.create(metrics, err => {
            console.log(err)
        })

    } catch (e) {
        console.log(e)

    }

};

exports.find = (query) => {
    const {
        startTimestamp,
        endTimestamp,
        appName
    } = query || {};

    const conditions = {
        timestamp: {
            $gte: startTimestamp || Number.MIN_VALUE,
            $lte: endTimestamp || Number.MAX_VALUE
        },
        appName: appName || /.*/
    };

    console.log(conditions);

    return Metric.find(conditions).exec()
};


const groupByAppName = (logs) => {
    return logs.reduce((rv, x) => {
        (rv[x.appName] = rv[x.appName] || []).push(x);
        return rv;
    }, {});
};


exports.scan = scan;



