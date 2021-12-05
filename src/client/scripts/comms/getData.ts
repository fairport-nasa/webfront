import { RESTGetData } from '../../../global/types';

/**
 * @param route The route from /data to use. Defaults to empty string.
 * @returns Fetched data.
 */
export const getData = async (route = ``): Promise<RESTGetData> => {
    const res = await fetch(new URL(route, `${window.location.href}data`).href);
    if (res.ok) return await res.json();
    else throw new Error(`Fetch failed with status ${res.status} | "${res.statusText}"`);
};
