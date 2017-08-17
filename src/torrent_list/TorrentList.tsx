import * as React from "react";
import {Torrent} from "../api/Models";
import {Table, TableCell, TableHead, TableRow} from "react-toolbox/lib/table";
import {bytesToSize} from "../utils/utils";
import {connect} from "react-redux";
import {FullState} from "../FullState";
import createEvent from "../torrent_details/actions";
import {TorrentDetailsActionTypes} from "../torrent_details/reducer";


interface StateProps {
    torrents:Torrent[];
}

interface DispatchProps {
    open_torrent(id:number):void;
}

class TorrentListBase extends React.PureComponent<StateProps & DispatchProps, {}> {
    render() {
        return (<Table selectable={false}>
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
            {this.props.torrents && this.props.torrents.map((tr) => {
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
        </Table>);
    }

    private handleClick = (id?: number) => {
        if (id) {
            console.log("OPEN_TORRENT", id);
            this.props.open_torrent(id);
        }
    }
}

function mapStateToProps(state: FullState, ownProps?:any):StateProps {
    return {
        torrents: state.torrents.torrents,
    }
}

const mapDispatchToProps = (dispatch: any):DispatchProps => ({
    open_torrent: (id) => {
        dispatch(createEvent(TorrentDetailsActionTypes.OPEN_DETAILS, id));
    }
});

export  const TorrentList = connect(mapStateToProps, mapDispatchToProps)(TorrentListBase);