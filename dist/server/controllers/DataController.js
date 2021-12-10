"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const constants_1 = require("../../global/constants");
const dummyData_1 = require("../utils/dummyData");
class DataController {
    constructor(dummy) {
        if (dummy) {
            this._dummy = (0, dummyData_1.createDummyData)(constants_1.constants.DUMMY_DATA_VALUES.sensorCount, Date.now() - constants_1.constants.DUMMY_DATA_VALUES.start, Date.now() - constants_1.constants.DUMMY_DATA_VALUES.end, constants_1.constants.DUMMY_DATA_VALUES.interval, constants_1.constants.DUMMY_DATA_VALUES.startY, constants_1.constants.DUMMY_DATA_VALUES.minWalk, constants_1.constants.DUMMY_DATA_VALUES.maxWalk, constants_1.constants.DUMMY_DATA_VALUES.minAdditional, constants_1.constants.DUMMY_DATA_VALUES.maxAdditional);
            this._dummyLive = (0, dummyData_1.createLiveDummyData)(this._dummy, constants_1.constants.DUMMY_DATA_VALUES.liveDataMaxAdd, constants_1.constants.DUMMY_DATA_VALUES.liveDataMinAdd);
        }
        else {
        }
    }
    get sensors() {
        if (this._dummy)
            return this._dummy;
        else {
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
