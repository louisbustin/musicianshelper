/**
 * This is a business layer between the conttroller for API and the raw mongoose models
 */
import logger from 'src/logger';
import BracketGroup, { IBracketGroup } from '../models/bracket-group.model';

export class BracketGroupService { 

    static getAll = () => {
        return BracketGroup.find({});
    }

    static getOne = (id: string) => {
        return BracketGroup.findById(id);
    }

    
    static search = (body: any) => {
        return BracketGroup.find(body);
    }

    static create = (bracketGroup: IBracketGroup) => {
        return BracketGroup.create(bracketGroup);
    }


    static update = (id: string, bracketGroup: IBracketGroup) => {
        return BracketGroup.findByIdAndUpdate(id, bracketGroup, {new : true});
    }

    static delete = (id: string) => {
        return BracketGroup.findByIdAndDelete(id);
    }

}
