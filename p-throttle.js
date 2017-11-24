const pThrottle = (fn, limit, interval) => {
    const queue = [];
    const timeouts = new Set();
    let activeCount = 0;

    const next = () => {
        activeCount++;

        const id = setTimeout(() => {
            activeCount--;
            if (queue.length > 0) next();
            timeouts.delete(id);
        }, interval);

        timeouts.add(id);

        const x = queue.shift();
        x.resolve(fn.apply(x.self, x.args));
    };

    const throttled = function () {
        const args = arguments;

        return new Promise((resolve, reject) => {
            queue.push({
                resolve,
                reject,
                args,
                self: this
            });

            if (activeCount < limit) {
                next();
            }
        });
    };

    return throttled;
};

module.exports = pThrottle;