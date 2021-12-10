"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigController = void 0;
const path_1 = require("path");
class ConfigController {
    constructor() {
        this.FILE_PATH = (0, path_1.resolve)(__dirname, `../../../config.json`);
    }
}
exports.ConfigController = ConfigController;
