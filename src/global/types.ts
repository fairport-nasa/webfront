/**
 * Payload sent from the /data endpoint.
 */
export type GraphData = Array<{
    color: string
    data: Array<{ x: number, y: number }>
    label: string
    yLabel: string
}>;
