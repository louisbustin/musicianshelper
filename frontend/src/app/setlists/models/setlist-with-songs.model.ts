import { IOrderedSong } from "./ordered-song.model";
import { ISetlist } from "./setlist.model";

export interface ISetlistWithSongs extends ISetlist {
    songs: IOrderedSong[];
}