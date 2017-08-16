import {all_torrents_fields, SessionStats, Torrent} from "./Models";
import {Observable} from "rxjs/Observable";
import {AjaxRequest} from "rxjs/Rx";

const USER: string = "corax";
const PASS: string = "dimon1991";

interface TRResponce<P> {
    result: string;
    arguments: P;
}

var SESSION: string = "";

function getAuth(): string {
    return `Basic ${btoa(`${USER}:${PASS}`)}`
}


export function GetTorrentList() {
    const timer = Observable.interval(1000);


    return getSession()
        .flatMap((str: string) => {
            console.log(str);

            SESSION = str;
            (window as any)["SESSION"] = str;

            return timer.switchMap((e: number) => {


                return Observable.zip(getStats(str), getTorrents(str));
            });
        })
}


function createOptions(session: string): AjaxRequest {
    return {
        url: "http://192.168.1.100:3000/transmission/rpc",
        method: "POST",
        crossDomain: true,
        headers: {
            "X-Transmission-Session-Id": session,
            "Content-Type": "application/json-rpc",
            "Authorization": getAuth()
        }
    }
}

export function getTorrents(session: string): Observable<Torrent[]> {
    let options = createOptions(session);
    options.body = JSON.stringify({
        arguments: {
            fields: [
                , "magnetLink"
                , "id"
                , "name"
                , "error"
                , "errorString"
                , "eta"
                , "isFinished"
                , "isStalled"
                , "leftUntilDone"
                , "metadataPercentComplete"
                , "peersConnected"
                , "peersGettingFromUs"
                , "peersSendingToUs"
                , "percentDone"
                , "queuePosition"
                , "rateDownload"
                , "rateUpload"
                , "recheckProgress"
                , "seedRatioMode"
                , "seedRatioLimit"
                , "sizeWhenDone"
                , "status"
                , "trackers"
                , "downloadDir"
                , "uploadedEver"
                , "uploadRatio"
                , "webseedsSendingToUs"]
        },
        method: "torrent-get"
    })

    return Observable.ajax(options).map((e => (e.response as TRResponce<{torrents: Torrent[]}>).arguments.torrents));
}

export function getStats(session: string): Observable<SessionStats> {
    let options = createOptions(session);
    options.body = "{\"method\":\"session-stats\"}";

    return Observable.ajax(options).map((e => (e.response as TRResponce<any>).arguments));
}


export function getSession() {
    let options = createOptions("");
    options.body = "{\"method\":\"session-stats\"}";

    return Observable.ajax(options).catch((e) => {
        if (e.xhr.status === 409) {
            const session = e.xhr.getResponseHeader("X-Transmission-Session-Id");

            console.log(session);
            return Observable.of(session);
        }

        throw e;
    });
}

export function getTorrent(id:number):Observable<Torrent> {
    let options = createOptions(SESSION);
    options.body = JSON.stringify({
        method: "torrent-get",
        arguments: {
            ids: [id],
            fields: all_torrents_fields
        }
    });

    return Observable
        .ajax(options)
        .map((e => (e.response as TRResponce<{torrents: Torrent[]}>).arguments.torrents[0]));

}