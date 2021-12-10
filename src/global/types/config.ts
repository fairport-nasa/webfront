/**
 * Nanolab GUI configuration.
 */
export interface Config {
    /**
     * Configured functions.
     */
    functions: ConfigFunction[]
    /**
     * General config.
     */
    general: ConfigGeneral
    /**
     * Configured sensors.
     */
    sensors: ConfigSensor[]
}

/**
 * A configured function.
 */
export interface ConfigFunction {
    /**
     * The action the function performs.
     */
    action: ConfigFunctionAction
    /**
     * The function's name.
     * Unique to the function.
     */
    name: string
    /**
     * The function's trigger.
     */
    trigger: ConfigFunctionAction
}

/**
 * An action for a function
 */
export interface ConfigFunctionAction {
    /**
     * The action device's ID.
     */
    deviceId: string
    /**
     * The value to set the device to.
     */
    value: string | number | boolean
}

/**
 * A trigger for a function.
 */
export interface ConfigFunctionTrigger {
    /**
     * Trigger the function when a sensor or sensors surpasses a specified value.
     */
    sensors?: Array<{
        /**
         * Trigger if the sensor's value is above the specified number.
         */
        aboveValue?: number
        /**
         * Trigger if the sensor's value is below the specified number.
         */
        belowValue?: number
        /**
         * Trigger if the sensor's value equals any of the specified values.
         */
        equalsValues?: Array<{
            /**
             * The value to equal.
             */
            value: number
            /**
             * How close the value has to be to trigger the function.
             * For example, with an `equalsValue` entry of `{ value: 10, threshold: 1 }`, the function will trigger whenever the sensor's value is between 9 and 11.
             * @default 0
             */
            threshold?: number
        }>
        /**
         * The sensor's ID.
         */
        id: string
        /**
         * The amount of time to wait in milliseconds before triggering the function again, if this trigger is still true.
         * This makes sure that the function isn't ran continuously when a threshold is surpassed.
         * Using low values is not recommended.
         */
        triggerAgainAfter: number | `never`
    }>
    /**
     * Triggers the function on an interval.
     */
    interval?: {
        /**
         * When the interval started, represented as a Unix timestamp in milliseconds.
         */
        start: number
        /**
         * The length of the interval in milliseconds.
         */
        time: number
    }
    /**
     * An array of Unix timestamps in milliseconds to trigger the function at.
     */
    equalsTimes?: number[]
}

/**
 * General configuration.
 */
export interface ConfigGeneral {
    /**
     * The hostname of the PI.
     * @default `nanolab`
     */
    hostname: string
    /**
     * The hotspot hosted by the PI.
     */
    hotspot: {
        /**
         * If the hotspot is enabled.
         * @default true
         */
        enabled: boolean
        /**
         * The hotspot's password.
         * @default undefined
         */
        password?: string
        /**
         * The hotspot's SSID.
         * @default `Nanolab`
         */
        ssid: string
    }
    /**
     * If disconnected sensors should be shown.
     * @default true
     */
    showDisconnectedSensors: boolean
}

/**
 * A configured sensor.
 */
export interface ConfigSensor {
    /**
     * The sensor's color in hex.
     * By default, a random value is created.
     */
    color: number
    /**
     * The sensor's ID.
     */
    id: string
    /**
     * The sensor's name.
     * By default, the sensor's ID is used.
     */
    name: string
    /**
     * Lines to draw, with values being on the x axis.
     */
    xLines?: ConfigSensorsLine[]
    /**
     * Lines to draw, with values being on the y axis.
     */
    yLines?: ConfigSensorsLine[]
}

/**
 * A line to draw on a sensor's graph.
 */
export interface ConfigSensorsLine {
    /**
     * The line's color in hex.
     * By default, a random value is created.
     */
    color: number
    /**
     * The line's label.
     */
    label: string
    /**
     * The value to draw the line at.
     */
    value: number
}
