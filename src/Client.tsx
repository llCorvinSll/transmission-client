import * as React from "react";
import GetTorrentList, {SessionStats, Torrent} from "./fetcher/TorrentList";
import {AppBar} from "react-toolbox/lib/app_bar";
import {Link} from "react-toolbox/lib/link";
import {Navigation} from "react-toolbox/lib/navigation";
import {Table, TableCell, TableHead, TableRow} from "react-toolbox/lib/table";


interface ClinetState {
    stats: SessionStats;
    torrents : Torrent[];
}

export default class Client extends React.Component<{}, ClinetState> {
    constructor(p:{},s:any) {
        super(p,s);

        this.state = {
            stats: {
                torrentCount: 0
            },

            torrents: []
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
                    {this.state.torrents.map((tr) => {
                        return (
                            <TableRow key={tr.id}>
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

            </div>
        )
    }
}

class TopBar extends React.Component<SessionStats, {}> {


    render() {
        return (
            <AppBar title='React Toolbox' leftIcon='menu'>
                <Navigation type='horizontal'>
                    <Link href='http://' label={`all: ${this.props.torrentCount}`} icon='inbox' />
                    <Link href='http://' active label='Profile' icon='person' />
                </Navigation>
            </AppBar>
        )
    }
}

function bytesToSize(bytes?:number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes == 0 || !bytes) {
        return '0 Byte'
    }
    var i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`);
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};