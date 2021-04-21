import { IListPickerItem } from "../shared/list-picker/list-picker-item.model";

export class ISong implements IListPickerItem {
    getDisplayText(): string {
        return this.name;
    }
    getEqualityText(): string {
        return this._id;
    }
    _id: string;
    name: string;
    artist: string;
    lyrics: string;
    notes: string;
    band: string;
}