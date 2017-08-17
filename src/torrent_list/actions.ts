import {TorrentListActionTypes, TorrentListAction} from "./reducer";
import {Torrent} from "../api/Models";

function actionCreator(type:TorrentListActionTypes, payload:any):TorrentListAction<any> {
    switch (type) {
        case TorrentListActionTypes.FETCH_LIST_COMPLETE: {
            return {
                type: TorrentListActionTypes.FETCH_LIST_COMPLETE,
                payload:payload
            }
        }
    }

    return {
        type: type,
        payload:payload
    }
}


interface TorrentListActionCreator {
    (type:TorrentListActionTypes.FETCH_LIST_COMPLETE, payload:Torrent[]):TorrentListAction<Torrent[]>;
    (type:TorrentListActionTypes.FETCH_LIST):TorrentListAction<void>;
}


export default (actionCreator as TorrentListActionCreator);