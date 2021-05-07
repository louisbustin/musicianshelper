import csv from 'csv-parser';
import fs from 'fs';
import logger from '../logger';
import Zip, { IZip } from '../models/zip.model';

function updateZips() {
  fs.createReadStream('C:\\Users\\bustinl\\Downloads\\simplemaps_uszips_basicv1.77\\uszips.csv')
    .pipe(csv())
    .on('data', (data) => {
      const zip: any = {
        zip: data.zip,
        lat: data.lat,
        lng: data.lng,
        city: data.city,
        stateId: data.state_id,
        stateName: data.state_name,
        ztca: data.ztca === 'TRUE',
        parentZcta: data.parent_ztca,
        population: data.population,
        density: data.density,
        countyFips: data.count_fips,
        countyName: data.county_name,
        countyNames: data.county_names_all.split('|'),
        countyFipsAll: data.county_fips_all.split('|'),
        imprecise: data.imprecise === 'TRUE',
        military: data.military === 'TRUE',
        timezone: data.timezone,
      };
      Zip.create(zip)
        .then((z: IZip) => logger.info(`created ${z.zip}`))
        .catch((err) => logger.error(err));
    })
    .on('end', () => {
      logger.info('Zip import done');
    });
}

export default updateZips;
