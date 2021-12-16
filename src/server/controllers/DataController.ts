import { constants } from '../../global/constants';

import { createDummyData, createLiveDummyData, updateLiveDummyData } from '../utils/dummyData';
import { SensorData, SensorDataLive } from '../../global/types/sensors';

/**
 * The data controller.
 * Interfaces with the python hardware controller.
 */
export class DataController {
    /**
     * Dummy sensor data used if dummy is set to `true` when initializing the DataController.
     */
    private readonly _dummy?: SensorData[];
    /**
     * Dummy live sensor data used if dummy is set to `true` when initializing the DataController.
     * This is the last sent payload. Used for making dummy live data look smooth.
     */
    private _dummyLive?: SensorDataLive[];

    /**
     * Create a data controller.
     * @param dummy If dummy data should be used.
     */
    constructor(dummy?: boolean) {
        if (dummy) {
            this._dummy = createDummyData(
                constants.DUMMY_DATA_VALUES.sensorCount,
                Date.now() - constants.DUMMY_DATA_VALUES.start,
                Date.now() - constants.DUMMY_DATA_VALUES.end,
                constants.DUMMY_DATA_VALUES.interval,
                constants.DUMMY_DATA_VALUES.startY,
                constants.DUMMY_DATA_VALUES.minWalk,
                constants.DUMMY_DATA_VALUES.maxWalk,
                constants.DUMMY_DATA_VALUES.minAdditional,
                constants.DUMMY_DATA_VALUES.maxAdditional
            );

            this._dummyLive = createLiveDummyData(this._dummy, constants.DUMMY_DATA_VALUES.liveDataMaxAdd, constants.DUMMY_DATA_VALUES.liveDataMinAdd);
        } else {
	    const Influx = require('infux');
	    const influx = Influx.InfluxDB({
		    host: "localhost",
		    database: "sensors",
		    shema: [
			    meausement: Influx.FieldType.STRING,
			    fields: {
				    value: Influx.FieldType.FLOAT
			    }
		    ]
	    });
            /**
             * @todo Setup IPC to retrieve data.
             */
        }
    }

    /**
     * Sensor data.
     * Retreived from InfluxDB or from dummy data.
     */
    public get sensors(): SensorData[] {
        if (this._dummy) return this._dummy;
        else {
	    const result = await influx.query("select value from proximity");
            return [];
        }
    }

    /**
     * Live sensor data.
     * Retreived from the python IPC or from dummy data.
     */
    public get liveSensors(): SensorDataLive[] {
        if (this._dummy && this._dummyLive) {
            this._dummyLive = updateLiveDummyData(this._dummy, this._dummyLive, constants.DUMMY_DATA_VALUES.liveDataMaxAdd, constants.DUMMY_DATA_VALUES.liveDataMinAdd);
            return this._dummyLive;
        } else {
            /**
             * @todo Fetch data from IPC.
             */
            return [];
        }
    }
}
