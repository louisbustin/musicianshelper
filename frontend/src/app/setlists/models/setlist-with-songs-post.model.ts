import { IOrderedSongPost } from "./order-song-post.model";
import { ISetlist } from "./setlist.model";

export interface ISetlistWithSongsPost extends ISetlist {
    songs: IOrderedSongPost[];
}