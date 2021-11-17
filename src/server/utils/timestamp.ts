/**
 * Creates a date timestamp.
 * @param time A date to create the timestamp from.
 * @returns The date timestamp string.
 */
export default (time: Date = new Date()): string => {
    const millisecond: string = time.getUTCMilliseconds().toString().padStart(4, `0`);
    const second: string = time.getUTCSeconds().toString().padStart(2, `0`);
    const minute: string = time.getUTCMinutes().toString().padStart(2, `0`);
    const hour: string = time.getUTCHours().toString().padStart(2, `0`);
    const day: string = time.getUTCDate().toString().padStart(2, `0`);
    const month: string = (time.getUTCMonth() + 1).toString().padStart(2, `0`);
    const year: string = time.getUTCFullYear().toString();
    return `${month}-${day}-${year} ${hour}:${minute}:${second}.${millisecond}`;
};
