import { SensorData } from '../../../global/types/sensors';
import { SocketSensorDataLiveUpdate } from '../../../global/types/api';

/**
 * A class with static methods for creating and modifying sensor overview panels.
 */
export class OverviewPanels {
    /**
     * Create an overview panel for a sensor.
     * Appends to `sensor-overview-panel-container`.
     * @param data Sensor data.
     */
    public static create = (data: SensorData): void => {
        document.getElementById(`sensor-overview-panel-container`)!.innerHTML += `<div id="sensor-overview-panel-${data.id}" class="sensor-overview-panel">
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
                - Connected: ${data.connected}
                <br>
                - Units: ${data.units}
                <br>
                - Data Points: ${data.data.length}
                <br>
                - Maximum Value: ${Math.round(data.max * 100) / 100} ${data.units}
                <br>
            </code>
        </div>
    </div>`;
    };

    /**
     * Edits a sensor's value in the overview panel.
     * Meant to be used with the Socket Live Sensor Data payload (op code 1).
     * @param data Data sent from the socket.
     * @param sensorData The sensor's information.
     */
    public static editLiveData = (data: SocketSensorDataLiveUpdate[`d`], sensorData: SensorData): void => {
        document.getElementById(`sensor-overview-panel-${data.id}-value-text`)!.innerText = `${Math.round(data.v * 100) / 100} ${sensorData.units}`;
        document.getElementById(`sensor-overview-panel-${data.id}-value-bar`)!.style.width = `${(data.v / sensorData.max) * 100}%`;
    };


    /**
     * Edits a sensor's data in the overview panel.
     * @param data Sensor data.
     */
    public static editSensorData = (data: SensorData): void => {
        document.getElementById(`sensor-overview-panel-${data.id}`)!.innerHTML = `<p id="sensor-overview-panel-${data.id}-name" class="sensor-overview-panel-name">${data.name}</p>
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
                - Connected: ${data.connected}
                <br>
                - Units: ${data.units}
                <br>
                - Data Points: ${data.data.length}
                <br>
                Maximum Value: ${data.max} ${data.units}
                <br>
            </code>
        </div>`;
    };
}
