import $ from 'jquery';
import LineChart from './chart/LineChart';
import getData from './comms/getData';

(async () => {
    const data = await getData();
    data.forEach((entry, i) => {
        $(`#data-container`).append(`<div id="graph-${i}-container" class="graph"><canvas id="graph-${i}"></canvas></div>`);
        // @ts-expect-error Property 'getContext' does not exist on type 'HTMLElement'.
        new LineChart(document.getElementById(`graph-${i}`).getContext(`2d`), entry);
    });
})();
