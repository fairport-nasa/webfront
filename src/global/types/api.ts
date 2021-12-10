import { Config, ConfigFunction, ConfigGeneral, ConfigSensor } from './config';
import { SensorData, SensorDataLive } from './sensors';

/**
 * The payload sent from GET /data
 */
export type RESTGetDataResult = SensorData[];


/**
 * The payload sent from GET /config
 */
export type RESTGetConfigResult = Config;


/**
 * The payload sent from GET /config/general
 */
export type RESTGetConfigGeneralResult = ConfigGeneral;

/**
 * The JSON body for PATCH /config/general
 */
export type RESTPatchConfigGeneralJSONBody = Partial<ConfigGeneral>;

/**
 * The payload sent from PATCH /config/general
 */
export type RESTPatchConfigGeneralResult = never;


/**
 * The payload sent from GET /config/functions
 */
export type RESTGetConfigFunctionsResult = ConfigFunction[];

/**
 * The JSON body for POST /config/functions
 */
export type RESTPostConfigFunctionsJSONBody = ConfigFunction;

/**
 * The payload sent from POST /config/functions
 */
export type RESTPostConfigFunctionsResult = never;

/**
 * The JSON body for PUT /config/functions
 */
export type RESTPutConfigFunctionsJSONBody = ConfigFunction[];

/**
 * The payload sent from PUT /config/functions
 */
export type RESTPutConfigFunctionsResult = never;

/**
 * The payload sent from GET /config/functions/:name
 */
export type RESTGetConfigFunctionResult = ConfigFunction;

/**
 * The JSON body for PATCH /config/functions/:name
 */
export type RESTPatchConfigFunctionJSONBody = Omit<Partial<ConfigFunction>, `name`>

/**
 * The payload sent from PATCH /config/functions/:name
 */
export type RESTPatchConfigFunctionResult = never;


/**
 * The payload sent from GET /config/sensors
 */
export type RESTGetConfigSensorsResult = ConfigSensor[];

/**
 * The JSON body for PUT /config/sensors
 */
export type RESTPutConfigSensorsJSONBody = ConfigSensor[];

/**
 * The payload sent from PUT /config/sensors
 */
export type RESTPutConfigSensorsResult = never;

/**
 * The payload sent from GET /config/sensors/:id
 */
export type RESTGetConfigSensorResult = ConfigSensor;

/**
 * The JSON body for PATCH /config/sensors/:id
 */
export type RESTPatchConfigSensorJSONBody = Omit<Partial<ConfigSensor>, `id`>

/**
 * The payload sent from PATCH /config/sensors/:id
 */
export type RESTPatchConfigSensorResult = never;

/**
 * The payload for a sensor update sent via the websocket.
 */
export type SocketSensorDataUpdate = {
    op: 0
    d: Partial<SensorData> & { id: string }
};

/**
 * The payload for live sensor data sent via the websocket.
 */
export type SocketSensorDataLiveUpdate = {
    op: 1
    d: SensorDataLive
};
