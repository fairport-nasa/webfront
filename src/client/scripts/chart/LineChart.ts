// Import modules.
import { Chart, Decimation, LineController, PointElement, LineElement, LinearScale, TimeScale, Tooltip } from 'chart.js';
import 'chartjs-adapter-luxon';

// Register Chart.js components.
Chart.register(Decimation, LinearScale, LineController, LineElement, PointElement, TimeScale, Tooltip);

/**
 * A line chart.
 */
export default class LineChart extends Chart {
    /**
     * Create a line chart.
     * @param ctx The canvas context to draw the chart on.
     * @param data Data to draw on the chart.
     */
    constructor(ctx: any, data: Array<{ x: number, y: number }>) {
        super(ctx, {
            type: `line`,
            data: { datasets: [
                {
                    borderColor: `rgb(75, 192, 192)`,
                    borderWidth: 1,
                    data,
                    indexAxis: `x`
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
                normalized: true,
                parsing: false,
                plugins: { decimation: {
                    enabled: true,
                    algorithm: `min-max`
                } },
                responsive: false,
                scales: {
                    x: {
                        type: `time`,
                        ticks: {
                            source: `auto`,
                            maxRotation: 0,
                            autoSkip: true
                        }
                    },
                    y: { type: `linear` }
                }
            }
        });
    }
}
