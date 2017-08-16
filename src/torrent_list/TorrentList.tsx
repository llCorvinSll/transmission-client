import * as React from "react";
import {Torrent} from "../api/Models";
import {Table, TableCell, TableHead, TableRow} from "react-toolbox/lib/table";
import {bytesToSize} from "../utils/utils";
import {connect} from "react-redux";


interface StateProps {
    torrents:Torrent[];
}

interface DispatchProps {
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
        console.log("OPEN_TORRENT", id);
    }
}

function mapStateToProps(state: any, ownProps?:any):StateProps {
    return {
        torrents: state.torrents,
    }

}

const mapDispatchToProps = (dispatch: any):DispatchProps => ({
    onClick1: () => {
        dispatch({ type: 'CLICK_ACTION'});
    }
});

export  const TorrentList = connect(mapStateToProps, mapDispatchToProps)(TorrentListBase);