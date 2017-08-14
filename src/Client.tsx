import * as React from "react";
import GetTorrentList from "./fetcher/TorrentList";
import {AppBar} from "react-toolbox/lib/app_bar";
import {Link} from "react-toolbox/lib/link";
import {Navigation} from "react-toolbox/lib/navigation";

export default class Client extends React.Component<{}, {}> {

    componentDidMount() {

        GetTorrentList().subscribe(([stats, torrents]) => {
            console.log(stats)
        })
    }


    render() {


        return (
            <div>

                <TopBar />

            </div>
        )
    }
}


class TopBar extends React.Component<{}, {}> {


    render() {
        return (
            <AppBar title='React Toolbox' leftIcon='menu'>
                <Navigation type='horizontal'>
                    <Link href='http://' label='Inbox' icon='inbox' />
                    <Link href='http://' active label='Profile' icon='person' />
                </Navigation>
            </AppBar>
        )
    }
}