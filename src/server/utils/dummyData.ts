import { SensorData, SensorDataLive } from '../../global/types/sensors';


/**
 * Creates dummy sensor data.
 * @param sensorCount The number of sensors to create.
 * @param start When the data should start as a unix timestamp in milliseconds.
 * @param end When the data should end as a unix timestamp in milliseconds.
 * @param interval The interval to create data points at.
 * @param startY The starting y position.
 * @param minWalk The minimum y distance to travel (Can be negative or positive).
 * @param maxWalk The maximum y distance to travel (Can be negative or positive).
 * @param minAdditional The minimum amount to add to the maximum value of the dataset to define as the sensor's maximum value.
 * @param maxAdditional The maximum amount to add to the maximum value of the dataset to define as the sensor's maximum value.
 */
export const createDummyData = (sensorCount: number, start: number, end: number, interval: number, startY: number, minWalk: number, maxWalk: number, minAdditional: number, maxAdditional: number): SensorData[] => {
    const daSensorData: SensorData[] = [];

    for (let i = 0; i < sensorCount; i++) {
        const data: Array<{ x: number, y: number }> = [];
        for (let d = start; d <= end; d += interval) {
            data.push({
                x: new Date(d).valueOf(),
                y: Math.max((data[data.length - 1]?.y ?? startY) + ((Math.random() * (maxWalk - minWalk)) + minWalk), 0)
            });
        }

        daSensorData.push({
            color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
            connected: true,
            data,
            id: `example_id_${i}`,
            name: `Random Data ${i}`,
            max: data.reduce((p, c) => p > c.y ? p : c.y, 0) + ((Math.random() * (maxAdditional - minAdditional)) + minAdditional),
            units: `Unit`
        });
    }

    return daSensorData;
};

/**
 * Creates dummy live sensor data.
 * @param sensorData Sensor data to base off of.
 * @param liveDataMinAdd The minimum value to add to the last sensor value (Can be negative or positive).
 * @param liveDataMaxAdd The maximum value to add to the last sensor value (Can be negative or positive).
 */
export const createLiveDummyData = (sensorData: SensorData[], liveDataMinAdd: number, liveDataMaxAdd: number): SensorDataLive[] => {
    return sensorData.map((sensor) => ({
        id: sensor.id,
        v: Math.min(Math.max(sensor.data[sensor.data.length - 1].y + (Math.random() * (liveDataMaxAdd - liveDataMinAdd)) + liveDataMinAdd, 0), sensor.max)
    }));
};

/**
 * Create updated dummy live sensor data.
 * @param sensorData Sensor data that the live data is based from.
 * @param liveSensorData The current live data.
 * @param liveDataMinAdd The minimum value to add to the last sensor value (Can be negative or positive).
 * @param liveDataMaxAdd The maximum value to add to the last sensor value (Can be negative or positive).
 */
export const updateLiveDummyData = (sensorData: SensorData[], liveSensorData: SensorDataLive[], liveDataMinAdd: number, liveDataMaxAdd: number): SensorDataLive[] => {
    return sensorData.map((sensor, i) => ({
        id: sensor.id,
        v: Math.min(Math.max(liveSensorData[i].v + (Math.random() * (liveDataMaxAdd - liveDataMinAdd)) + liveDataMinAdd, 0), sensor.max)
    }));
};
