import { SensorData } from '../../../global/types';

import $ from 'jquery';

export default (data: SensorData): void => {
    $(`#overview-panel`).append(`<div id="sensor-overview-panel-${data.id}">
        <p class="overview-panel-sensor-label">${data.name}</p>
        <div class="overview-panel-value-code-block-container">
            <code id="sensor-value-${data.id}">0 ${data.units}</code>
        </div>
        <div class="progress-bar">
            <span id="sensor-progress-${data.id}" style="width: 0%"></span>
        </div>
        <div class="overview-panel-code-block-container">
            <code id="sensor-detailed-${data.id}">
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
