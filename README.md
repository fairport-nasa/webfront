# @fairport-nasa/webfront
Creates a website that allows NanoLab experimenters to view and retrieve sensor data, create experiments with custom functions, and otherwise easily manipulate the NanoLab hardware. This repository serves data from the hardware controller, retrieved via InfluxDB or IPC, to the webclient. In production, this code would be hosted on the NanoLab's Raspberry Pi, and would be accessible via a Wi-Fi hotspot.

The webfront is made using [TypeScript](https://www.typescriptlang.org/), which is compiled into [JavaScript](https://www.javascript.com/). JavaScript is used at runtime, and has a JIT compiler. The server runs JavaScript using [Node.js](https://nodejs.org/en/), a JavaScript runtime built on [Google's V8 engine](https://v8.dev/). The client's browser has a built-in JavaScript engine.

## How it works

### Server
Serverside code consists of 3 main controllers; the DataController, the [fastify](https://www.fastify.io/) server, and the websocket. Fastify serves the webfront, as well as REST routes for the client to fetch data from. The websocket (using an implementation of [ws](https://github.com/websockets/ws)) gives the client live sensor data, as well as updates to sensor properties. The DataController is used by both the webfront and socket, and acts as a middleware between the communication controllers and InfluxDB / the IPC to the python hardware controller.

### Client
Clientside code retrieves data from the server to create graphs and sensor overview panels. Additionally, 

## API
Useful you wish to build your own client, or otherwise interface with the server.

### REST

#### `GET` `/data`
Returns an array of sensor data.
```ts
Array<{
    /**
     * The color to display on the graph.
     */
    color: string,
    /**
     * The data from the sensor.
     * x is a unix timestamp, y is the value.
     */
    data: Array<{ x: number, y: number }>,
    /**
     * The sensor's ID.
     */
    id: string,
    /**
     * The sensor's name.
     */
    name: string,
    /**
     * The sensor's maximum value.
     */
    max: number,
    /**
     * The units used by the sensor.
     */
    units: string
}>
```

### Socket
By default, the websocket is hosted on port `4000`. After connecting to the websocket, it will begin to send payloads automatically.

Payloads use the following format:
```ts
{
    /**
     * The operation code for the payload.
     */
    op: number
    /**
     * The payload's data.
     */
    d: any
}
```

#### Op code `0`
An op code of `0` is Live Sensor Data.
```ts
{
    op: 0
    d: {
        /**
         * The sensor's ID.
         */
        id: string
        /**
         * The sensor's current value.
         */
        v: number
    }
}
```

#### Op code `1`
An op code of `1` is a Sensor Update.
```ts
{
    op: 1
    d: {
        /**
         * The color to display on the graph.
         */
        color?: string
        /**
         * The data from the sensor.
         * This is new data, meaning that any data retreived prior to the last payload is omitted.
         * Sensor data from before the socket was connected is also excluded.
         */
        data?: Array<{ x: number, y: number }>
        /**
         * The sensor's ID.
         */
        id: string
        /**
         * The sensor's name.
         */
        name?: string
        /**
         * The sensor's maximum value.
         */
        max?: number
        /**
         * The units used by the sensor.
         */
        units?: string
    }
}
```

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
- [InfluxDB 2.x](https://www.influxdata.com/)

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
