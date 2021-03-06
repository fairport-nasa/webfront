import { constants } from '../../../global/constants';
import { OverviewPanels } from '../displayData/OverviewPanels';
import { RESTGetDataResult } from '../../../global/types/api';

/**
 * Start the websocket connection to the server, and handle incoming events.
 * @param sensorData Fetched sensor data.
 * @returns The created socket.
 */
export const startSocket = (sensorData: RESTGetDataResult): WebSocket => {
    const ws = new WebSocket(`ws://${window.location.hostname}:${constants.DEFAULT_SOCKET_PORT}`);

    ws.addEventListener(`open`, () => console.log(`Socket connection opened`));
    ws.addEventListener(`close`, () => console.log(`Socket connection closed`));
    ws.addEventListener(`error`, (ev) => console.log(ev));

    ws.addEventListener(`message`, (ev) => {
        const data = JSON.parse(ev.data);
        const sensorIndex = sensorData.findIndex((sensor) => sensor.id === data.d.id);
        if (!sensorData[sensorIndex]) return;

        if (data.op === 0) {
            sensorData[sensorIndex] = {
                ...sensorData[sensorIndex],
                ...data.d
            };
            OverviewPanels.editSensorData(sensorData[sensorIndex]);
        }
        if (data.op === 1) OverviewPanels.editLiveData(data.d, sensorData[sensorIndex]);
    });

    return ws;
};
