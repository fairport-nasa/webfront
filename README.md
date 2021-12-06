# @fairport-nasa/webfront
Creates a website that allows NanoLab experimenters to view and retrieve sensor data, create experiments with custom functions, and otherwise easily manipulate the NanoLab hardware. This repository serves data from the hardware controller, retrieved via InfluxDB or IPC, to the webclient. In production, this code would be hosted on the NanoLab's Raspberry Pi, and would be accessible via a Wi-Fi hotspot.

The webfront is made using [TypeScript](https://www.typescriptlang.org/), which is compiled into [JavaScript](https://www.javascript.com/). JavaScript is used at runtime, and has a JIT compiler. The server runs JavaScript using [Node.js](https://nodejs.org/en/), a JavaScript runtime built on [Google's V8 engine](https://v8.dev/). The client's browser has a built-in JavaScript engine.

## How it works

### Server
Serverside code consists of 3 main controllers; the DataController, the [fastify](https://www.fastify.io/) server, and the websocket. Fastify serves the webfront, as well as REST routes for the client to fetch data from. The websocket (using an implementation of [ws](https://github.com/websockets/ws)) gives the client live sensor data, as well as updates to sensor properties. The DataController is used by both the webfront and socket, and acts as a middleware between the communication controllers and InfluxDB / the IPC to the python hardware controller.

### Client
Clientside code retrieves data from the server to create graphs and sensor overview panels. Additionally, 

## To do

#### Server
- [x] Add dummy data creation for testing and development
- [x] Serve sensor data via fastify
- [x] Serve live sensor data via websocket
- [ ] Serve sensor updates via websocket
- [ ] Retrieve sensor data from InfluxDB and IPC instead of just dummy data
- [ ] Handle sensor management requests
- [ ] Handle functions management requests
- [ ] Handle data management requests
- [ ] Handle data download requests
- [ ] Handle general options requests

#### Client
- [x] Setup plotting of retrieved data
- [x] Setup display for detailed sensor data
- [x] Setup display for live sensor data
- [ ] Loading screen
- [ ] Add sensor management
- [ ] Add graph management
- [ ] Add functions management
- [ ] Add data management
- [ ] Add data download options
- [ ] Add general options

## Prerequisites
- [Node.js 16.13.0 or newer](https://nodejs.org/en/)
- [NPM 8.1.0 or newer](https://www.npmjs.com/)
- [InfluxDB](https://www.influxdata.com/)

## Running
Clone from the [build](https://github.com/fairport-nasa/webfront/tree/build) branch.
```sh
git clone -b build --single-branch --depth=1 https://github.com/fairport-nasa/webfront.git
```

Install node modules.
```sh
npm install --production
```

Start the server.
```sh
npm start
```

It is also recommended that you create a `.env` file.
```sh
cp template.env .env
```
You can edit this file to your liking.
