import createDummyData from '../utils/createDummyData';

// Import modules.
import { Router } from 'express';
import { InfluxDB } from '@influxdata/influxdb-client';

// Create router.
const router = Router();

// Create InfluxDB connection.
const influx = new InfluxDB({
    url: `http://localhost:8086`
});

router.get(`/`, async (req, res) => {
    const readAPI = influx.getQueryApi(`sensors`);
    res.status(200).send(await readAPI.queryRaw(`select value from proximity;`));
});

export default router;
