import { Request, Response } from 'express';

export default class BandController {

    static getAll = (request: Request, response: Response) => {

        //TODO: pull real data
        let junkBands = [
            {
                "_id": "11",
                "name": "Average Joes"
            },
            {
                "_id": "21",
                "name": "Silence Falls"
            }
        ]
        return response.status(200).json(junkBands);
    }
    
}