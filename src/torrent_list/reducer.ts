import {Torrent} from "../api/Models";
import {ActionsObservable} from "redux-observable";
import * as API from "../api/Api";
import actionCreator from "./actions";
import {BaseAction} from "../utils/actions";
import 'rxjs';
import {Observable} from "rxjs/Observable";

export interface TorrentListState {
    torrents:Torrent[];
}

export const enum TorrentListActionTypes {
    FETCH_LIST = 'torrent_list/FETCH_LIST',
    FETCH_LIST_COMPLETE = 'torrent_list/FETCH_LIST_COMPLETE'
}

export interface TorrentListAction<T> extends BaseAction<TorrentListActionTypes, T> {
}


export function torrentListLoadEpic(action$:ActionsObservable<TorrentListAction<any>>):Observable<TorrentListAction<any>> {
    return action$.ofType(TorrentListActionTypes.FETCH_LIST)
        .switchMap(() => {
            return API.getTorrents((window as any)["SESSION"])
        })
        .map((torrents:Torrent[]) => {
            return actionCreator(TorrentListActionTypes.FETCH_LIST_COMPLETE, torrents);
        })

}

export function torrentListReducer(state:TorrentListState = { torrents: []}, action:TorrentListAction<any>):TorrentListState {

    switch (action.type) {
        case TorrentListActionTypes.FETCH_LIST: {
            return state;
        }

        case TorrentListActionTypes.FETCH_LIST_COMPLETE: {
            return {
                torrents: action.payload
            };
        }
    }

    return state;
}