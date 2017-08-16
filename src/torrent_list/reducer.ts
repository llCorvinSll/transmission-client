import {Torrent} from "../api/Models";
import {ActionsObservable} from "redux-observable";
import * as API from "../api/Api";
import actionCreator from "./actions";
import 'rxjs/operator/switchMap';
import {Observable} from "rxjs/Observable";

interface TorrentListState {
    torrents:Torrent[];
}

export const enum ActionTypes {
    FETCH_LIST = 'torrent_list/FETCH_LIST',
    FETCH_LIST_COMPLETE = 'torrent_list/FETCH_LIST_COMPLETE'
}

export interface BaseAction<T> {
    type:ActionTypes;
    payload:T;
}


export function torrentListLoadEpic(action$:ActionsObservable<BaseAction<any>>):Observable<BaseAction<any>> {
    return action$.ofType(ActionTypes.FETCH_LIST)
        .switchMap(() => {
            return API.getTorrents((window as any)["SESSION"])
        })
        .map((torrents:Torrent[]) => {
            return actionCreator(ActionTypes.FETCH_LIST_COMPLETE, torrents);
        })

}

export function torrentListReducer(state:TorrentListState = { torrents: []}, action:BaseAction<any>):TorrentListState {

    switch (action.type) {
        case ActionTypes.FETCH_LIST: {
            return state;
        }

        case ActionTypes.FETCH_LIST_COMPLETE: {
            return {
                torrents: action.payload
            };
        }
    }

    return state;
}