import {BaseAction} from "../utils/actions";
import {ActionsObservable} from "redux-observable";
import {Torrent} from "../api/Models";
import actionCreator from "./actions";
import * as API from "../api/Api";
import 'rxjs';
import {Observable} from "rxjs/Observable";

export const enum TorrentDetailsActionTypes {
    TOGGLE_DETAILS = 'torrent_details/TOGGLE_DETAILS',
    OPEN_DETAILS_COMPLETE = 'torrent_details/OPEN_DETAILS_COMPLETE',
    OPEN_DETAILS_CANCEL = 'torrent_details/OPEN_DETAILS_CANCEL',
}

export interface TorrentDetailsState {
    torrent?:Torrent;
    active:boolean;
}


export function torrentDetailsLoadEpic(action$:ActionsObservable<TorrentDetailsAction<any>>):Observable<TorrentDetailsAction<any>> {
    return action$.ofType(TorrentDetailsActionTypes.TOGGLE_DETAILS)
        .switchMap((action) => {
            return API.getTorrent(action.payload)
                .takeUntil(action$.ofType(TorrentDetailsActionTypes.TOGGLE_DETAILS))
        })
        .map((torrent:Torrent) => {
            return actionCreator(TorrentDetailsActionTypes.OPEN_DETAILS_COMPLETE, torrent);
        })
}

export function torrentDetailsReducer(state:TorrentDetailsState = { active: false }, action:TorrentDetailsAction<any>):TorrentDetailsState {
    switch (action.type) {
        case TorrentDetailsActionTypes.TOGGLE_DETAILS: {
            return {
                active: !state.active
            }
        }

        case TorrentDetailsActionTypes.OPEN_DETAILS_COMPLETE: {
            return {
                active: state.active,
                torrent: action.payload
            };
        }
    }

    return state;
}

export interface TorrentDetailsAction<T> extends BaseAction<TorrentDetailsActionTypes, T> {
}

