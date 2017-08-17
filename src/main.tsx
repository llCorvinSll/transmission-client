import * as React from "react";
import * as ReactDOM from "react-dom";
import Client from "./Client";
import {Provider} from "react-redux";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {TorrentListActionTypes, torrentListLoadEpic, torrentListReducer} from "./torrent_list/reducer";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import 'rxjs';
import {getSession} from "./api/Api";
import {Observable} from "rxjs/Observable";
import actionCreator from "./torrent_list/actions";
import {torrentDetailsLoadEpic, torrentDetailsReducer} from "./torrent_details/reducer";
import 'rxjs'




const epicMiddleware = combineEpics<any>(torrentListLoadEpic, torrentDetailsLoadEpic)

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducer = combineReducers({
    torrents: torrentListReducer,
    details: torrentDetailsReducer
})

const store = createStore(
    reducer,
    composeEnhancers(
    applyMiddleware(createEpicMiddleware(epicMiddleware))
    )
);


getSession().flatMap((str) => {
    (window as any)["SESSION"] = str;

    return Observable.interval(1000);
}).subscribe(() => {
    store.dispatch(actionCreator(TorrentListActionTypes.FETCH_LIST))


})

ReactDOM.render(<Provider store={store}>
    <Client/>
</Provider>, document.getElementById('app'));

