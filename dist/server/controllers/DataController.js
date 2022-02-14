"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const constants_1 = require("../../global/constants");
const dummyData_1 = require("../utils/dummyData");
const influxdb_client_1 = require("@influxdata/influxdb-client");
const url_1 = require("url");
class DataController {
    constructor(dummy) {
        if (dummy) {
            this._dummy = (0, dummyData_1.createDummyData)(constants_1.constants.DUMMY_DATA_VALUES.sensorCount, Date.now() - constants_1.constants.DUMMY_DATA_VALUES.start, Date.now() - constants_1.constants.DUMMY_DATA_VALUES.end, constants_1.constants.DUMMY_DATA_VALUES.interval, constants_1.constants.DUMMY_DATA_VALUES.startY, constants_1.constants.DUMMY_DATA_VALUES.minWalk, constants_1.constants.DUMMY_DATA_VALUES.maxWalk, constants_1.constants.DUMMY_DATA_VALUES.minAdditional, constants_1.constants.DUMMY_DATA_VALUES.maxAdditional);
            this._dummyLive = (0, dummyData_1.createLiveDummyData)(this._dummy, constants_1.constants.DUMMY_DATA_VALUES.liveDataMaxAdd, constants_1.constants.DUMMY_DATA_VALUES.liveDataMinAdd);
        }
        else {
            this.influx = new influxdb_client_1.InfluxDB({ url: new url_1.URL(`/${process.env.INFLUX_ORG ?? constants_1.constants.DEFAULT_INFLUX_ORG}`, process.env.INFLUX_URL ?? constants_1.constants.DEFAULT_INFLUX_URL).toString() });
        }
    }
    get sensors() {
        if (this._dummy)
            return this._dummy;
        else {
            this.influx.getQueryApi(process.env.INFLUX_ORG ?? constants_1.constants.DEFAULT_INFLUX_ORG).queryRaw(`select value from proximity`).then(console.log);
            return [];
        }
    }
    get liveSensors() {
        if (this._dummy && this._dummyLive) {
            this._dummyLive = (0, dummyData_1.updateLiveDummyData)(this._dummy, this._dummyLive, constants_1.constants.DUMMY_DATA_VALUES.liveDataMaxAdd, constants_1.constants.DUMMY_DATA_VALUES.liveDataMinAdd);
            return this._dummyLive;
        }
        else {
            return [];
        }
    }
}
exports.DataController = DataController;
