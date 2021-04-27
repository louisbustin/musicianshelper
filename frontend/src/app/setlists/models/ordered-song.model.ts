import { ISong } from "src/app/models/song.model";

export interface IOrderedSong extends ISong {
    order: number;
    song: ISong;
}