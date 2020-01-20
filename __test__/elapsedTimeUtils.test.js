const {calculateElapsedTimeMetrics} = require('../utils/elapsedTimeUtils');

test('single value', () => {

    let result = calculateElapsedTimeMetrics([{elapsedTime: 123}])

    expect(result).toEqual({
        elapsedTime50: 123,
        elapsedTime90: 123,
        elapsedTime95: 123,
        elapsedTime99: 123,
    })

});

