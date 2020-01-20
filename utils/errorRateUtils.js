
exports.calculateErrorRates = (logs) => {
    let initialData = {
        totalRequestCount: 0,
        clientErrorCount: 0,
        serverErrorCount: 0,
        successfulRequestsCount: 0,
    };

    return logs.reduce((acc, current) => ({
        totalRequestCount: acc.totalRequestCount + 1,
        clientErrorCount: acc.clientErrorCount + isClientError(current.statusCode),
        serverErrorCount: acc.serverErrorCount + isServerError(current.statusCode),
        successfulRequestsCount: acc.successfulRequestsCount + isSuccessfulRequest(current.statusCode),
    }), initialData)
};


const isClientError = (code) => (code >= 400 && code < 500);
const isServerError = (code) => (code >= 500);
const isSuccessfulRequest = (code) => (code < 400);


exports.isClientError = isClientError;
exports.isServerError = isServerError;
exports.isSuccessfulRequest = isSuccessfulRequest;