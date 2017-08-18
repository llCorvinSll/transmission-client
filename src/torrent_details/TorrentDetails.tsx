import * as React from 'react';
import {Dialog} from "react-toolbox/lib/dialog";
import {Torrent} from "../api/Models";
import {FullState} from "../FullState";
import {TorrentDetailsActionTypes} from "./reducer";
import createEvent from "./actions"
import {connect} from "react-redux";

interface StateProps {
    torrent?:Torrent;
    active:boolean;
}

interface DispatchProps {
    handle_click():void;
}

class TorrentDetailsBase extends React.PureComponent<StateProps & DispatchProps, {}> {
    render() {
        return (<Dialog
            active={this.props.active}
            onEscKeyDown={this.props.handle_click}
            onOverlayClick={this.props.handle_click}
            title='My awesome dialog'
            >
            <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
            <Data {...this.props}/>
        </Dialog>);
    }
}



class Data extends React.Component<StateProps, {}> {
    render() {
        return (<pre>
            {this.props && JSON.stringify(this.props.torrent)}
        </pre>)
    }
}


function mapStateToProps(state: FullState, ownProps?:any):StateProps {
    return {
        torrent: state.details.torrent,
        active: state.details.active
    }
}

const mapDispatchToProps = (dispatch: any):DispatchProps => ({
    handle_click: () => {
        dispatch(createEvent(TorrentDetailsActionTypes.TOGGLE_DETAILS, 0));
    }
});

export const TorrentDetails = connect(mapStateToProps, mapDispatchToProps)(TorrentDetailsBase);