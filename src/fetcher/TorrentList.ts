import {AjaxRequest, Observable} from "@reactivex/rxjs";

const USER:string = "corax";
const PASS:string = "dimon1991";

var SESSION:string = "";

function getAuth():string {
    return `Basic ${btoa(`${USER}:${PASS}`)}`
}


export default function GetTorrentList() {
    const timer = Observable.interval(500);


    return getSession()
        .flatMap((str:string) => {
        console.log(str);

        return timer.switchMap((e: number) => {


            return Observable.zip(getStats(str), getTorrents(str));
        });
    })
}


function createOptions(session:string):AjaxRequest {
    return {
        url: "http://192.168.1.100:3000/transmission/rpc",
        method: "POST",
        crossDomain: true,
        headers: {
            "X-Transmission-Session-Id": session,
            "Content-Type" : "application/json-rpc",
            "Authorization": getAuth()
        }
    }
}

function getTorrents(session:string) {
    let options = createOptions(session);
    options.body = JSON.stringify({
        arguments: {
            fields: [
                ,"magnetLink"
                ,"id"
                ,"error"
                ,"errorString"
                ,"eta"
                ,"isFinished"
                ,"isStalled"
                ,"leftUntilDone"
                ,"metadataPercentComplete"
                ,"peersConnected"
                ,"peersGettingFromUs"
                ,"peersSendingToUs"
                ,"percentDone"
                ,"queuePosition"
                ,"rateDownload"
                ,"rateUpload"
                ,"recheckProgress"
                ,"seedRatioMode"
                ,"seedRatioLimit"
                ,"sizeWhenDone"
                ,"status"
                ,"trackers"
                ,"downloadDir"
                ,"uploadedEver"
                ,"uploadRatio"
                ,"webseedsSendingToUs"]
        },
        method: "torrent-get"
    })

    return Observable.ajax(options).map((e => e.response));
}

function getStats(session:string) {
    let options = createOptions(session);
    options.body = "{\"method\":\"session-stats\"}";

    return Observable.ajax(options).map((e => e.response));
}


function getSession (){
    let options = createOptions("");
    options.body = "{\"method\":\"session-stats\"}";

    return Observable.ajax(options).catch((e) => {
        if(e.xhr.status === 409) {
            const session = e.xhr.getResponseHeader("X-Transmission-Session-Id");

            console.log(session);
            return Observable.of(session);
        }

        throw e;
    });
}


const all_torrents_fields = [,"activityDate"
    ,"addedDate"
    ,"bandwidthPriority"
    ,"comment"
    ,"corruptEver"
    ,"creator"
    ,"dateCreated"
    ,"desiredAvailable"
    ,"doneDate"
    ,"downloadDir"
    ,"downloadedEver"
    ,"downloadLimit"
    ,"downloadLimited"
    ,"error"
    ,"errorString"
    ,"eta"
    ,"etaIdle"
    ,"files"
    ,"fileStats"
    ,"hashString"
    ,"haveUnchecked"
    ,"haveValid"
    ,"honorsSessionLimits"
    ,"id"
    ,"isFinished"
    ,"isPrivate"
    ,"isStalled"
    ,"leftUntilDone"
    ,"magnetLink"
    ,"manualAnnounceTime"
    ,"maxConnectedPeers"
    ,"metadataPercentComplete"
    ,"name"
    ,"peer-limit"
    ,"peers"
    ,"peersConnected"
    ,"peersFrom"
    ,"peersGettingFromUs"
    ,"peersSendingToUs"
    ,"percentDone"
    ,"pieces"
    ,"pieceCount"
    ,"pieceSize"
    ,"priorities"
    ,"queuePosition"
    ,"rateDownload"
    ,"rateUpload"
    ,"recheckProgress"
    ,"secondsDownloading"
    ,"secondsSeeding"
    ,"seedIdleLimit"
    ,"seedIdleMode"
    ,"seedRatioLimit"
    ,"seedRatioMode"
    ,"sizeWhenDone"
    ,"startDate"
    ,"status"
    ,"trackers"
    ,"trackerStats"
    ,"totalSize"
    ,"torrentFile"
    ,"uploadedEver"
    ,"uploadLimit"
    ,"uploadLimited"
    ,"uploadRatio"
    ,"wanted"
    ,"webseeds"
    ,"webseedsSendingToUs"]