import {BaseAction} from "../utils/actions";
import {ActionsObservable} from "redux-observable";
import {Torrent} from "../api/Models";
import actionCreator from "./actions";
import * as API from "../api/Api";
import 'rxjs';
import {Observable} from "rxjs/Observable";

export const enum TorrentDetailsActionTypes {
    OPEN_DETAILS = 'torrent_details/OPEN_DETAILS',
    OPEN_DETAILS_COMPLETE = 'torrent_details/OPEN_DETAILS_COMPLETE',
    OPEN_DETAILS_CANCEL = 'torrent_details/OPEN_DETAILS_CANCEL',
}

export interface TorrentDetailsState {
    torrent?:Torrent;
}


export function torrentDetailsLoadEpic(action$:ActionsObservable<TorrentDetailsAction<any>>):Observable<TorrentDetailsAction<any>> {
    return action$.ofType(TorrentDetailsActionTypes.OPEN_DETAILS)
        .switchMap((action) => {
            return API.getTorrent(action.payload)
        })
        .map((torrent:Torrent) => {
            return actionCreator(TorrentDetailsActionTypes.OPEN_DETAILS_COMPLETE, torrent);
        })
}

export function torrentDetailsReducer(state:TorrentDetailsState = { }, action:TorrentDetailsAction<any>):TorrentDetailsState {
    switch (action.type) {
        case TorrentDetailsActionTypes.OPEN_DETAILS: {
            return state;
        }

        case TorrentDetailsActionTypes.OPEN_DETAILS_COMPLETE: {
            return {
                torrent: action.payload
            };
        }
    }

    return state;
}

export interface TorrentDetailsAction<T> extends BaseAction<TorrentDetailsActionTypes, T> {
}

