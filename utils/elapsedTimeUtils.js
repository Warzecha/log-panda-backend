exports.calculateElapsedTimeMetrics = (logs) => {
    let sorted = logs.sort((a, b) => {
        return a.elapsedTime - b.elapsedTime;
    });

    const index50 = Math.floor(sorted.length * 0.50);
    const index90 = Math.floor(sorted.length * 0.90);
    const index95 = Math.floor(sorted.length * 0.95);
    const index99 = Math.floor(sorted.length * 0.99);

    return ({
        elapsedTime50: sorted[index50].elapsedTime,
        elapsedTime90: sorted[index90].elapsedTime,
        elapsedTime95: sorted[index95].elapsedTime,
        elapsedTime99: sorted[index99].elapsedTime,
    })
};