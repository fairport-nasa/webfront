import { createElements } from './displayData/createElements';
import { getData } from './comms/getData';
import { startSocket } from './comms/socket';

(async () => {
    const data = await getData();
    console.log(`Fetched data`);

    await createElements(data);
    console.log(`Initiated sensor elements.`);

    startSocket(data);
})();
