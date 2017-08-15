import {AjaxRequest, Observable} from "@reactivex/rxjs";

const USER: string = "corax";
const PASS: string = "dimon1991";

interface TRResponce<P> {
    result: string;
    arguments: P;
}

export interface Stats {
    uploadedBytes: number;
    downloadedBytes: number;
    filesAdded: number;
    sessionCount: number;
    secondsActive: number;
}

export interface SessionStats {
    activeTorrentCount?: number;
    downloadSpeed?: number;
    pausedTorrentCount?: number;
    torrentCount?: number;
    uploadSpeed?: number;
    ["cumulative-stats"]?: Stats;
    ["current-stats"]?: Stats;
}

export interface Torrent {
    activityDate?: number;
    addedDate?: number;
    bandwidthPriority?: number;
    comment?: string;
    corruptEver?: number;
    creator?: string;
    dateCreated?: number;
    desiredAvailable?: number;
    doneDate?: number;
    downloadDir?: string;
    downloadedEver?: number;
    downloadLimit?: number;
    downloadLimited?: boolean;
    error?: number;
    errorString?: string;
    eta?: number;
    etaIdle?: number;
    files?: any[];
    fileStats?: any[];
    hashString?: string;
    haveUnchecked?: number;
    haveValid?: number;
    honorsSessionLimits?: boolean;
    id?: number;
    isFinished?: boolean;
    isPrivate?: boolean;
    isStalled?: boolean;
    leftUntilDone?: number;
    magnetLink?: string;
    manualAnnounceTime?: number;
    maxConnectedPeers?: number;
    metadataPercentComplete?: number;
    name?: string;
    ["peer-limit"]?: number;
    peers?: any[];
    peersConnected?: number;
    peersFrom?: any;
    peersGettingFromUs?: number;
    peersSendingToUs?: number;
    percentDone?: number;
    pieces?: string;
    pieceCount?: number;
    pieceSize?: number;
    priorities?: any[];
    queuePosition?: number;
    rateDownload?: number; // B/s
    rateUpload?: number; // B/s
    recheckProgress?: number;
    secondsDownloading?: number;
    secondsSeeding?: number;
    seedIdleLimit?: number;
    seedIdleMode?: number;
    seedRatioLimit?: number;
    seedRatioMode?: number;
    sizeWhenDone?: number;
    startDate?: number;
    status?: number;
    trackers?: any[];
    trackerStats?: any[];
    totalSize?: number;
    torrentFile?: string;
    uploadedEver?: number;
    uploadLimit?: number;
    uploadLimited?: boolean;
    uploadRatio?: number;
    wanted?: any[];
    webseeds?: any[];
    webseedsSendingToUs?: number;
}


var SESSION: string = "";

function getAuth(): string {
    return `Basic ${btoa(`${USER}:${PASS}`)}`
}


export default function GetTorrentList() {
    const timer = Observable.interval(1000);


    return getSession()
        .flatMap((str: string) => {
            console.log(str);

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

function getTorrents(session: string): Observable<Torrent[]> {
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

function getStats(session: string): Observable<SessionStats> {
    let options = createOptions(session);
    options.body = "{\"method\":\"session-stats\"}";

    return Observable.ajax(options).map((e => (e.response as TRResponce<any>).arguments));
}


function getSession() {
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


const all_torrents_fields = [, "activityDate"
    , "addedDate"
    , "bandwidthPriority"
    , "comment"
    , "corruptEver"
    , "creator"
    , "dateCreated"
    , "desiredAvailable"
    , "doneDate"
    , "downloadDir"
    , "downloadedEver"
    , "downloadLimit"
    , "downloadLimited"
    , "error"
    , "errorString"
    , "eta"
    , "etaIdle"
    , "files"
    , "fileStats"
    , "hashString"
    , "haveUnchecked"
    , "haveValid"
    , "honorsSessionLimits"
    , "id"
    , "isFinished"
    , "isPrivate"
    , "isStalled"
    , "leftUntilDone"
    , "magnetLink"
    , "manualAnnounceTime"
    , "maxConnectedPeers"
    , "metadataPercentComplete"
    , "name"
    , "peer-limit"
    , "peers"
    , "peersConnected"
    , "peersFrom"
    , "peersGettingFromUs"
    , "peersSendingToUs"
    , "percentDone"
    , "pieces"
    , "pieceCount"
    , "pieceSize"
    , "priorities"
    , "queuePosition"
    , "rateDownload"
    , "rateUpload"
    , "recheckProgress"
    , "secondsDownloading"
    , "secondsSeeding"
    , "seedIdleLimit"
    , "seedIdleMode"
    , "seedRatioLimit"
    , "seedRatioMode"
    , "sizeWhenDone"
    , "startDate"
    , "status"
    , "trackers"
    , "trackerStats"
    , "totalSize"
    , "torrentFile"
    , "uploadedEver"
    , "uploadLimit"
    , "uploadLimited"
    , "uploadRatio"
    , "wanted"
    , "webseeds"
    , "webseedsSendingToUs"]