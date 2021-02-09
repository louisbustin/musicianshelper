/**
 * This is a business layer between the controller for API and the raw mongoose models
 */

import BracketGroup, { IBracketGroup } from '../models/bracket-group.model';

export class BracketGroupService { 

    static getAll = () => {
        return BracketGroup.find({});
    }

    static getOne = (id: string) => {
        return BracketGroup.findById(id);
    }

    static getAllByOwner = (ownerId: string) => {
        return BracketGroup.find({owner: ownerId});
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
