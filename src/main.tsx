import * as React from "react";
import * as ReactDOM from "react-dom";
import Client from "./Client";
import {Provider} from "react-redux";
import {createEpicMiddleware} from "redux-observable";
import {ActionTypes, torrentListLoadEpic, torrentListReducer} from "./torrent_list/reducer";
import {applyMiddleware, compose, createStore} from "redux";
import 'rxjs';
import {getSession} from "./api/Api";
import {Observable} from "rxjs/Observable";
import actionCreator from "./torrent_list/actions";


const epicMiddleware = createEpicMiddleware(torrentListLoadEpic);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(torrentListReducer,
    composeEnhancers(
    applyMiddleware(epicMiddleware)
    )
);


getSession().flatMap((str) => {
    (window as any)["SESSION"] = str;

    return Observable.interval(1000);
}).subscribe(() => {
    store.dispatch(actionCreator(ActionTypes.FETCH_LIST))


})

ReactDOM.render(<Provider store={store}>
    <Client/>
</Provider>, document.getElementById('app'));

