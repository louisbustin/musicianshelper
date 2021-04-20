import { ISong } from "src/app/models/song.model";
import { ISetlist } from "./setlist.model";

export interface ISetlistWithBands extends ISetlist {
    bands: ISong[];
}