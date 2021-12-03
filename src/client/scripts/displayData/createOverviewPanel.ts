import { SensorData } from '../../../global/types';

import $ from 'jquery';

export default (data: SensorData): void => {
    $(`#sensor-overview-panel-container`).append(`<div id="sensor-overview-panel-${data.id}" class="sensor-overview-panel">
        <p id="sensor-overview-panel-${data.id}-name" class="sensor-overview-panel-name">${data.name}</p>
        <div id="sensor-overview-panel-${data.id}-value-container" class="sensor-overview-panel-value-container">
            <div id="sensor-overview-panel-${data.id}-value-text-container" class="sensor-overview-panel-value-text-container">
                <code id="sensor-overview-panel-${data.id}-value-text" class="sensor-overview-panel-value-text">${Math.round(data.data[data.data.length - 1].y * 100) / 100} ${data.units}</code>
            </div>
            <div id="sensor-overview-panel-${data.id}-value-bar-container" class="progress-bar sensor-overview-panel-value-bar-container">
                <span id="sensor-overview-panel-${data.id}-value-bar" style="width: ${(data.data[data.data.length - 1].y / data.max) * 100}%"></span>
            </div>
        </div>
        <div id="sensor-overview-panel-${data.id}-detail-container" class="sensor-overview-panel-detail-container">
            <code id="sensor-overview-panel-${data.id}-detail" class="sensor-overview-panel-detail">
                - ID: ${data.id}
                <br>
                - Units: ${data.units}
                <br>
                - Data Points: ${data.data.length}
                <br>
                <br>
            </code>
        </div>
    </div>`);
};
