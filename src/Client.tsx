import * as React from "react";
import {SessionStats, Torrent} from "./api/Models";
import {getTorrent} from "./api/Api";
import {Dialog} from "react-toolbox/lib/dialog";
import {TorrentList} from "./torrent_list/TorrentList";
import {AppBar} from "react-toolbox/lib/app_bar";
import {Link} from "react-toolbox/lib/link";
import {Navigation} from "react-toolbox/lib/navigation";
import {TorrentDetails} from "./torrent_details/TorrentDetails";


interface ClinetState {
    stats?: SessionStats;
    torrents?: Torrent[];
    dialog_open?: boolean;
    active_torrent?: number;

}

export default class Client extends React.Component<{}, ClinetState> {
    constructor(p: {}, s: any) {
        super(p, s);

        this.state = {
            stats: {
                torrentCount: 0
            },

            torrents: [],
            dialog_open: false,
            active_torrent: -1
        }

    }

    render() {
        return (
            <div>
                <TopBar {...this.state.stats}/>

                <TorrentList />

                <TorrentDetails />

            </div>
        )
    }

    private handleClick = (id?: number) => {
        console.log("OPEN_TORRENT", id);
    }
}

class TopBar extends React.Component<SessionStats, {}> {


    render() {
        return (
            <AppBar title='Transmission' leftIcon='menu'>
                <Navigation type='horizontal'>
                    <Link href='http://' label={`all: ${this.props.torrentCount}`} icon='inbox'/>
                    <Link href='http://' active label='Profile' icon='person'/>
                </Navigation>
            </AppBar>
        )
    }
}

interface TorrentDetailsProps {
    id?: number;
}

interface TorrentDetailsState {
    torrent?: Torrent;
}