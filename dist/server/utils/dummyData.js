"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLiveDummyData = exports.createLiveDummyData = exports.createDummyData = void 0;
const createDummyData = (sensorCount, start, end, interval, startY, minWalk, maxWalk, minAdditional, maxAdditional) => {
    const sensorData = [];
    for (let i = 0; i < sensorCount; i++) {
        const data = [];
        for (let d = start; d <= end; d += interval) {
            data.push({
                x: new Date(d).valueOf(),
                y: Math.max((data[data.length - 1]?.y ?? startY) + ((Math.random() * (maxWalk - minWalk)) + minWalk), 0)
            });
        }
        sensorData.push({
            color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
            data,
            id: `example_id_${i}`,
            name: `Random Data ${i}`,
            max: data.reduce((p, c) => p > c.y ? p : c.y, 0) + ((Math.random() * (maxAdditional - minAdditional)) + minAdditional),
            units: `Unit`
        });
    }
    return sensorData;
};
exports.createDummyData = createDummyData;
const createLiveDummyData = (sensorData, liveDataMinAdd, liveDataMaxAdd) => {
    return sensorData.map((sensor) => ({
        id: sensor.id,
        v: Math.min(Math.max(sensor.data[sensor.data.length - 1].y + (Math.random() * (liveDataMaxAdd - liveDataMinAdd)) + liveDataMinAdd, 0), sensor.max)
    }));
};
exports.createLiveDummyData = createLiveDummyData;
const updateLiveDummyData = (sensorData, liveSensorData, liveDataMinAdd, liveDataMaxAdd) => {
    return sensorData.map((sensor, i) => ({
        id: sensor.id,
        v: Math.min(Math.max(liveSensorData[i].v + (Math.random() * (liveDataMaxAdd - liveDataMinAdd)) + liveDataMinAdd, 0), sensor.max)
    }));
};
exports.updateLiveDummyData = updateLiveDummyData;
