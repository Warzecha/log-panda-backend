require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
require('./models/Log');
require('./models/App');
require('./models/Metric');

const indexRouter = require('./routes/index');
const logsRouter = require('./routes/logs');
const appsRouter = require('./routes/apps');
const metricsRouter = require('./routes/metrics');

const {scheduleMetricsScan} = require('./services/MetricsService');

const app = express();
const port = 8080;

app.options('*', cors());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());


app.use('/', indexRouter);
app.use('/logs', logsRouter);
app.use('/apps', appsRouter);
app.use('/metrics', metricsRouter);

connect();

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen);
    return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
}

function listen() {
    if (app.get('env') === 'test') return;
    app.listen(port, () => {
        console.log(`Log Panda app listening on port ${port}!`);
        scheduleMetricsScan();
    });

}