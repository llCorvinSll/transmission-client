import * as React from "react";
import GetTorrentList, {SessionStats} from "./fetcher/TorrentList";
import {AppBar} from "react-toolbox/lib/app_bar";
import {Link} from "react-toolbox/lib/link";
import {Navigation} from "react-toolbox/lib/navigation";


interface ClinetState {
    stats: SessionStats;
}

export default class Client extends React.Component<{}, ClinetState> {
    constructor(p:{},s:any) {
        super(p,s);

        this.state = {
            stats: {
                torrentCount: 0
            }
        }

    }

    componentDidMount() {

        GetTorrentList().subscribe(([stats, torrents]) => {
            this.setState({stats: stats})
        })
    }


    render() {


        return (
            <div>

                <TopBar {...this.state.stats}/>

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