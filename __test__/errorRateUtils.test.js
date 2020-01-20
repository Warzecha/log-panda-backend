const {calculateErrorRates} = require('../utils/errorRateUtils');

const withCode = (code) => ({statusCode: code});

test('single successful request', () => {
    const result = calculateErrorRates([withCode(201)]);
    expect(result).toEqual({
        totalRequestCount: 1,
        clientErrorCount: 0,
        serverErrorCount: 0,
        successfulRequestsCount: 1,
    })
});

test('single client error', () => {
    const result = calculateErrorRates([withCode(402)]);
    expect(result).toEqual({
        totalRequestCount: 1,
        clientErrorCount: 1,
        serverErrorCount: 0,
        successfulRequestsCount: 0,
    })
});

test('single server error', () => {
    const result = calculateErrorRates([withCode(500)]);
    expect(result).toEqual({
        totalRequestCount: 1,
        clientErrorCount: 0,
        serverErrorCount: 1,
        successfulRequestsCount: 0,
    })
});

test('calculate error rates', () => {
    const requests = [
        withCode(500),
        withCode(200),
        withCode(404),
        withCode(400),
        withCode(300)
    ];

    const result = calculateErrorRates(requests);
    expect(result).toEqual({
        totalRequestCount: 5,
        clientErrorCount: 2,
        serverErrorCount: 1,
        successfulRequestsCount: 2,
    })
});