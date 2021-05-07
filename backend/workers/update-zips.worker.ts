import csv from 'csv-parser';
import fs from 'fs';
import logger from '../logger';
import Zip, { IZip } from '../models/zip.model';

function updateZips() {
  fs.createReadStream('C:\\Users\\bustinl\\Downloads\\simplemaps_uszips_basicv1.77\\sample.csv')
    .pipe(csv())
    .on('data', (data) => {
      const zip: IZip = {

      };

      logger.info(JSON.stringify(data));
    })
    .on('end', () => {
      logger.info('Zip import done');
    });
}

export default updateZips;
