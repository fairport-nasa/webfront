import LineChart from './chart/LineChart';
import getData from './comms/getData';

(async () => {
    // @ts-expect-error Property 'getContext' does not exist on type 'HTMLElement'.
    const ctx = document.getElementById(`graph`).getContext(`2d`);

    new LineChart(ctx, await getData());
})();
