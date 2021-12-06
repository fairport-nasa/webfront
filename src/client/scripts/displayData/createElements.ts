import { LineChart } from '../displayData/LineChart';
import { OverviewPanels } from './OverviewPanels';
import { SensorData } from '../../../global/types';
import { waitForAppend } from '../utils/waitForAppend';

/**
 * Creates elements for sensor data.
 * @param data Sensor data.
 */
export const createElements = async (data: SensorData[]): Promise<void> => {
    const initElements: Promise<void>[] = [];
    data.forEach((entry) => {
        initElements.push(new Promise((resolve) => {
            document.getElementById(`data-container`)!.innerHTML += `<div id="sensor-graph-${entry.id}-container" class="sensor-graph-container"><canvas id="sensor-graph-${entry.id}"></canvas></div>`;
            waitForAppend(`sensor-graph-${entry.id}`).then(() => {
                // @ts-expect-error Property 'getContext' does not exist on type 'HTMLElement'.
                new LineChart(document.getElementById(`sensor-graph-${entry.id}`).getContext(`2d`), entry);

                OverviewPanels.create(entry);
                waitForAppend(`sensor-overview-panel-${entry.id}`, `sensor-overview-panel-container`).then(() => resolve());
            });
        }));
    });
    await Promise.all(initElements);
};
