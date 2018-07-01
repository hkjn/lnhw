import React, { Component } from 'react';
import ChannelIcon from '../assets/img/channel-icon.svg';

import '../assets/css/channel.css';

class Channel extends Component {
    render() {
        const btcValue = this.props.funds * 0.00000001;
        const usValue = btcValue * 6353.44;

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
                    <div className="state-btn">{this.props.connected}</div>
                </div>
                <div className="channel-balance">
                    <div className="balance-btc">
                            {btcValue}
                        <span>BTC</span>
                    </div>
                    <div className="balance-usd">
                        {usValue}
                        <span>USD</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Channel;
