"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const constants_1 = require("../../global/constants");
const log_1 = require("../utils/log");
const fastify_1 = __importDefault(require("fastify"));
const fastify_static_1 = __importDefault(require("fastify-static"));
const path_1 = require("path");
const startServer = async (data, config) => {
    const port = process.env.WEBFRONT_PORT ? parseInt(process.env.WEBFRONT_PORT) : constants_1.constants.DEFAULT_WEBFRONT_PORT;
    const server = (0, fastify_1.default)();
    server.addHook(`onReady`, () => (0, log_1.log)(`green`, `INFO`, `Webfront listening on http://${constants_1.constants.HOST}:${port}`));
    server.addHook(`onRequest`, (req, _, next) => {
        (0, log_1.log)(`cyan`, `INFO`, `Webfront ${req.method} ${req.url}`);
        next();
    });
    server.addHook(`onResponse`, (req, _, next) => {
        (0, log_1.log)(`white`, `INFO`, `Webfront successful response to ${req.method} ${req.url}`);
        next();
    });
    server.addHook(`onError`, (req, _, error) => (0, log_1.log)(`red`, `ERROR`, `Webfront error code ${error.code} "${error.message}" on ${req.method} ${req.url}`));
    await server.register(fastify_static_1.default, {
        prefix: `/`,
        root: (0, path_1.resolve)(__dirname, `../../client/public`)
    });
    server.get(`/`, (_, reply) => {
        return reply.sendFile(`index.html`);
    });
    server.get(`/data`, (_, res) => void res.send(data.sensors));
    server.get(`/functions`, (_, res) => void res.send(config));
    await server.listen(port, constants_1.constants.HOST);
    return server;
};
exports.startServer = startServer;
