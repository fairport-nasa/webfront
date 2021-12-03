import createOverviewPanel from './displayData/createOverviewPanel';
import getData from './comms/getData';
import LineChart from './displayData/LineChart';

import $ from 'jquery';

(async () => {
    const data = await getData();
    data.forEach((entry) => {
        $(`#data-container`).append(`<div id="sensor-graph-${entry.id}-container" class="sensor-graph-container"><canvas id="sensor-graph-${entry.id}"></canvas></div>`);

        createOverviewPanel(entry);
        // @ts-expect-error Property 'getContext' does not exist on type 'HTMLElement'.
        new LineChart(document.getElementById(`sensor-graph-${entry.id}`).getContext(`2d`), entry);
    });
})();
