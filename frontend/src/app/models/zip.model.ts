export interface IZip {
    zip: string;
    lat: number;
    lng: number;
    city: string;
    stateId: string;
    stateName: string;
    ztca: boolean;
    parentZcta: string;
    population: number;
    density: number;
    countyFips: number;
    countyName: string;
    countyNames: [string];
    countyFipsAll: [number];
    imprecise: boolean;
    military: boolean;
    timezone: string;
}