import { SensorData } from '../../../global/types';

import { Chart, Decimation, LineController, PointElement, LineElement, LinearScale, TimeScale, Title, Tooltip } from 'chart.js';
import 'chartjs-adapter-luxon';

// Register Chart.js components.
Chart.register(Decimation, LinearScale, LineController, LineElement, PointElement, TimeScale, Title, Tooltip);

/**
 * A line chart.
 */
export class LineChart extends Chart {
    /**
     * Create a line chart.
     * @param ctx The canvas context to draw the chart on.
     * @param data Data to draw on the chart.
     */
    constructor(ctx: any, data: SensorData) {
        super(ctx, {
            type: `line`,
            data: { datasets: [
                {
                    backgroundColor: data.color,
                    borderColor: data.color,
                    borderWidth: 1,
                    data: data.data,
                    indexAxis: `x`,
                    label: data.name
                }
            ] },
            options: {
                animation: false,
                interaction: {
                    mode: `nearest`,
                    axis: `x`,
                    intersect: false
                },
                elements: { point: { radius: 0 } },
                maintainAspectRatio: false,
                normalized: true,
                parsing: false,
                plugins: {
                    decimation: {
                        enabled: true,
                        algorithm: `min-max`
                    },
                    title: {
                        display: true,
                        text: data.name
                    }
                },
                responsive: true,
                scales: {
                    x: {
                        grid: { color: `rgba(0, 0, 0, 0.4)` },
                        type: `time`,
                        ticks: {
                            source: `auto`,
                            maxRotation: 0,
                            autoSkip: true
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: data.units
                        },
                        grid: { color: `rgba(0, 0, 0, 0.4)` }, type: `linear`
                    }
                }
            }
        });
    }
}
