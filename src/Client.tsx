import * as React from "react";
import {AppBar} from "react-toolbox/lib/app_bar";
import {Link} from "react-toolbox/lib/link";
import {Navigation} from "react-toolbox/lib/navigation";
import {Table, TableCell, TableHead, TableRow} from "react-toolbox/lib/table";
import {SessionStats, Torrent} from "./api/Models";
import {getTorrent, GetTorrentList} from "./api/Api";
import {Dialog} from "react-toolbox/lib/dialog";


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

                <Table selectable={false}>
                    <TableHead>
                        <TableCell numeric={false} key="id">
                            id
                        </TableCell>
                        <TableCell numeric={false} key="name">
                            name
                        </TableCell>
                        <TableCell numeric={false} key="dl_up">
                            DL/UP
                        </TableCell>
                        <TableCell numeric={false} key="size">
                            size
                        </TableCell>
                        <TableCell numeric={false} key="ratio">
                            ratio
                        </TableCell>
                    </TableHead>
                    {this.state.torrents && this.state.torrents.map((tr) => {
                        return (
                            <TableRow key={tr.id} onClick={() => this.handleClick(tr.id)}>
                                <TableCell numeric={false} key="id">
                                    {tr.id}
                                </TableCell>
                                <TableCell numeric={false} key="name">
                                    {tr.name}
                                </TableCell>
                                <TableCell numeric={false} key="dl_up">
                                    {bytesToSize(tr.rateDownload)}/{bytesToSize(tr.rateUpload)}
                                </TableCell>
                                <TableCell numeric={false} key="size">
                                    {bytesToSize(tr.sizeWhenDone)}
                                </TableCell>
                                <TableCell numeric={false} key="ratio">
                                    {tr.uploadRatio}
                                </TableCell>
                            </TableRow>
                        )
                    })}

                </Table>

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
        this.setState({
            active_torrent: id,
            dialog_open: !this.state.dialog_open
        })
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

function bytesToSize(bytes?: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes == 0 || !bytes) {
        return '0 Byte'
    }
    var i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`);
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};


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