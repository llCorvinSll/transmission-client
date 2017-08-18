import {TorrentListState} from "./torrent_list/reducer";
import {TorrentDetailsState} from "./torrent_details/reducer";

export interface FullState {
    torrents: TorrentListState;
    details:  TorrentDetailsState;
}