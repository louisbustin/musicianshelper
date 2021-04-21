import { ISong } from "src/app/models/song.model";
import { ISetlist } from "./setlist.model";

export interface ISetlistWithSongs extends ISetlist {
    songs: ISong[];
}