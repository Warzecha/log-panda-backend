const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const logsRouter = require('./routes/logs');

const app = express();
const port = 8080;

app.use(logger('dev'));
app.use(express.json());


app.use('/', indexRouter);
app.use('/logs', logsRouter);

app.listen(port, () => console.log(`Log Panda app listening on port ${port}!`));