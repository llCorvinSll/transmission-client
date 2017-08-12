import * as React from "react";
import GetTorrentList from "./fetcher/TorrentList";


export default class Client extends React.Component<{}, {}> {

    componentDidMount() {

        GetTorrentList().subscribe((e:any) => {
            console.log(e)
        })
    }


    render() {


        return (
            <div> asdasdsads </div>
        )
    }
}