import {TorrentDetailsActionTypes, TorrentDetailsAction} from "./reducer";
import {Torrent} from "../api/Models";

function actionCreator(type:TorrentDetailsActionTypes, payload:any):TorrentDetailsAction<any> {
    return {
        type: type,
        payload:payload
    }
}

interface TorrentDetailsActionCreator {
    (type:TorrentDetailsActionTypes.TOGGLE_DETAILS, id:number):TorrentDetailsAction<Torrent>;
    (type:TorrentDetailsActionTypes.OPEN_DETAILS_COMPLETE, payload:Torrent):TorrentDetailsAction<Torrent>;
    (type:TorrentDetailsActionTypes.OPEN_DETAILS_CANCEL):TorrentDetailsAction<void>;
}

export default (actionCreator as TorrentDetailsActionCreator);