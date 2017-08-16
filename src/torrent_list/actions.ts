import {ActionTypes, BaseAction} from "./reducer";
import {Torrent} from "../api/Models";

function actionCreator(type:ActionTypes, payload:any):BaseAction<any> {
    switch (type) {
        case ActionTypes.FETCH_LIST_COMPLETE: {
            return {
                type: ActionTypes.FETCH_LIST_COMPLETE,
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
    (type:ActionTypes.FETCH_LIST_COMPLETE, payload:Torrent[]):BaseAction<Torrent[]>;
    (type:ActionTypes.FETCH_LIST):BaseAction<void>;
}


export default (actionCreator as TorrentListActionCreator);