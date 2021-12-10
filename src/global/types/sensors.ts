/**
 * Data from a sensor.
 */
export interface SensorData {
    /**
     * The color to display on the graph.
     */
    color: string
    /**
     * If the sensor is currently connected.
     */
    connected: boolean
    /**
     * The data from the sensor.
     */
    data: Array<{
        /**
         * The current time, represented as a Unix timestamp in milliseconds.
         */
        x: number
        /**
         * The sensor's value.
         */
        y: number
    }>
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
 * Live sensor data.
 */
export interface SensorDataLive {
    /**
     * The sensor's ID.
     */
    id: string
    /**
     * The sensor's current value.
     */
    v: number
}
