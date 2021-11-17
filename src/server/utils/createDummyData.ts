/**
 * Creates dummy data.
 * @param start When the data should start as a unix timestamp in milliseconds.
 * @param end When the data should end as a unix timestamp in milliseconds.
 * @param interval The interval to create data points at.
 * @param startY The starting y position.
 * @param minWalk The minimum y distance to travel (Can be negative or positive).
 * @param maxWalk The maximum y distance to travel (Can be negative or positive).
 */
export default (start: number, end: number, interval: number, startY: number, minWalk: number, maxWalk: number): Array<{ x: number, y: number }> => {
    const data: Array<{ x: number, y: number }> = [];
    for (let i = start; i <= end; i += interval) {
        data.push({
            x: new Date(i).valueOf(),
            y: Math.max((data[data.length - 1]?.y ?? startY) + ((Math.random() * (maxWalk - minWalk)) + minWalk), 0)
        });
    }
    return data;
};
