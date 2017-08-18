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
                <TableCell key="id">
                    id
                </TableCell>
                <TableCell key="name">
                    name
                </TableCell>
                <TableCell key="dl_up">
                    DL/UP
                </TableCell>
                <TableCell key="size">
                    size
                </TableCell>
                <TableCell key="ratio">
                    ratio
                </TableCell>
            </TableHead>
            {this.props.torrents && this.props.torrents.map((tr) => {

                let handler = this.click_handlers[tr.id];
                if(!handler) {
                    handler = () => {
                        console.log("CLICK", tr.id);
                        this.props.open_torrent(tr.id);
                    }

                    this.click_handlers[tr.id] = handler;
                }

                return (
                    <TableRow key={tr.id} onClick={handler}>
                        <TableCell key="id">
                            {tr.id}
                        </TableCell>
                        <TableCell key="name">
                            {tr.name}
                        </TableCell>
                        <TableCell key="dl_up">
                            {bytesToSize(tr.rateDownload)}/{bytesToSize(tr.rateUpload)}
                        </TableCell>
                        <TableCell key="size">
                            {bytesToSize(tr.sizeWhenDone)}
                        </TableCell>
                        <TableCell key="ratio">
                            {tr.uploadRatio}
                        </TableCell>
                    </TableRow>
                )
            })}
        </Table>);
    }


    private click_handlers: {[key:number]: ()=> void } = {};
}

function mapStateToProps(state: FullState, ownProps?:any):StateProps {
    return {
        torrents: state.torrents.torrents,
    }
}

const mapDispatchToProps = (dispatch: any):DispatchProps => ({
    open_torrent: (id) => {
        console.log(id);
        dispatch(createEvent(TorrentDetailsActionTypes.TOGGLE_DETAILS, id));
    }
});

export  const TorrentList = connect(mapStateToProps, mapDispatchToProps)(TorrentListBase);