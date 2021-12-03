/**
 * Data from a sensor.
 */
export interface SensorData {
    /**
     * The color to display on the graph.
     */
    color: string
    /**
     * The data from the sensor.
     */
    data: Array<{ x: number, y: number }>
    /**
     * The sensor's ID.
     */
    id: string
    /**
     * The sensor's name.
     */
    name: string
    /**
     * The sensor's maximum value.
     */
    max: number
    /**
     * The units used by the sensor.
     */
    units: string
}

/**
 * The payload sent from /data
 */
export type RESTGetData = SensorData[];

/**
 * The payload for a sensor update sent via the websocket.
 */
export type SocketSensorUpdate = Partial<SensorData> & { id: string };
