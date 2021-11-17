// Import modules.
import { get } from 'jquery';

/**
 * @param route The route from /data to use. Defaults to empty string.
 * @returns Fetched data.
 */
export default (route = ``): Promise<Array<{ x: number, y: number }>> => {
    return new Promise((resolve, reject) => {
        get({
            url: `/data${route}`,
            success: (data, status) => {
                if (status === `success`) resolve(data);
                else reject(`Unable to get data.`);
            },
            error: () => reject(`Unable to get data.`)
        });
    });
};
