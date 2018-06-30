import React, { Component } from 'react';
import UnpluggedIcon from '../assets/img/unplugged-icon.svg';
import { getInfo } from '../services/api';

import '../assets/css/plug.css';

class PlugWallet extends Component {
    componentDidMount() {
        getInfo().then((response) => this.props.setMainState(response.data));
        // getInfo().then((response) => this.props.setMainState({}));
    }

    componentDidUpdate() {
        setTimeout(function() {
            if (!this.props.connected) {
                getInfo().then((response) => this.props.setMainState(response.data));
                // getInfo().then((response) => this.props.setMainState({}));
            } else {
                clearTimeout();
            }
        }.bind(this), 1000);
    }

    render() {
        if(this.props.connected) {
            return null;
        }

        return (
            <div>
                <div id="plug-wrapper" />
                <div id="plug-info">
                    <img src={UnpluggedIcon} alt="unplugged"/>
                    <div className="info-title">Looks like your wallet is not connected.</div>
                    <div className="info-description">Please connect your device to proceed.</div>
                </div>
            </div>
        );
    }
}

export default PlugWallet;
