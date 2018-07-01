import React, { Component } from 'react';
import ChannelIcon from '../assets/img/channel-icon.svg';

import '../assets/css/channel.css';

import { convertMSatToObv } from '../services/helper.js';

class Channel extends Component {
    render() {
        const { value, curr } = convertMSatToObv(this.props.funds || 0);

        const usValue = this.props.funds / 10**11 * 6353.44;

        const _usValue = Number(usValue).toFixed(2)

        const cState = this.props.channelState.replace('CHANNELD_', '');

        return (
            <div className="channel-wrapper">
                <div className="channel-img">
                    <img src={ChannelIcon} alt="channel" />
                </div>
                <div className="channel-description">
                    <div className="channel-name">
                        {this.props.channelId}
                    </div>
                    <div className="channel-to">
                        Connected with:<span> {this.props.peerId}</span>
                    </div>
                </div>
                <div className="channel-state">
                    <span>Current state</span>
                    <div className={`state-btn ${this.props.channelState}`}>{cState}</div>
                </div>
                <div className="channel-balance">
                    <div className="balance-btc">
                            {value || 0}
                        <span>{curr}</span>
                    </div>
                    <div className="balance-usd">
                        {_usValue}
                        <span>USD</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Channel;
