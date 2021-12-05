import { createOverviewPanel } from './displayData/createOverviewPanel';
import { getData } from './comms/getData';
import { LineChart } from './displayData/LineChart';
import { waitForAppend } from './utils/waitForAppend';

(async () => {
    const data = await getData();
    data.forEach(async (entry) => {
        document.getElementById(`data-container`)!.innerHTML += `<div id="sensor-graph-${entry.id}-container" class="sensor-graph-container"><canvas id="sensor-graph-${entry.id}"></canvas></div>`;
        await waitForAppend(`sensor-graph-${entry.id}`);

        createOverviewPanel(entry);
        // @ts-expect-error Property 'getContext' does not exist on type 'HTMLElement'.
        new LineChart(document.getElementById(`sensor-graph-${entry.id}`).getContext(`2d`), entry);

        setInterval(() => {
            const oldValue = parseInt(document.getElementById(`sensor-overview-panel-${entry.id}-value-text`)!.innerText.replace(` ${entry.units}`, ``));
            const newValue = Math.min(Math.max(oldValue + ((Math.random() * 1000) - 500), 0), entry.max);
            document.getElementById(`sensor-overview-panel-${entry.id}-value-text`)!.innerText = `${Math.round(newValue * 100) / 100} ${entry.units}`;
            document.getElementById(`sensor-overview-panel-${entry.id}-value-bar`)!.style.width = `${newValue / entry.max * 100}%`;
        }, 100);
    });
})();
