import * as React from "react";
import {SessionStats, Torrent} from "./api/Models";
import {getTorrent, GetTorrentList} from "./api/Api";
import {Dialog} from "react-toolbox/lib/dialog";
import {TorrentList} from "./torrent_list/TorrentList";
import {AppBar} from "react-toolbox/lib/app_bar";
import {Link} from "react-toolbox/lib/link";
import {Navigation} from "react-toolbox/lib/navigation";


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

    componentDidMount() {

        GetTorrentList().subscribe(([stats, torrents]) => {
            this.setState({
                stats: stats,
                torrents: torrents,
            })
        })
    }


    render() {
        return (
            <div>
                <TopBar {...this.state.stats}/>

                <TorrentList />

                <Dialog
                    active={this.state.dialog_open}
                    onEscKeyDown={this.handleClick}
                    onOverlayClick={this.handleClick}
                    title='My awesome dialog'
                >
                    <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
                    <TorrentDetails id={this.state.active_torrent}/>
                </Dialog>

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

class TorrentDetails extends React.Component<TorrentDetailsProps, TorrentDetailsState> {
    constructor(p:TorrentDetailsProps,s:any) {
        super(p,s);

        this.state = {

        }
    }

    componentDidMount() {
        if (this.props.id) {

            console.log("render details")
            getTorrent(this.props.id).subscribe((e) => {
                console.log(e)

                this.setState({
                    torrent:e
                })

            })
        }
    }

    render() {
        return (<pre>
            {this.state && JSON.stringify(this.state.torrent, )}
        </pre>)
    }
}