import React, { Component } from 'react';
import ChannelIcon from '../assets/img/channel-icon.svg';

import '../assets/css/channel.css';

class Channel extends Component {
    render() {
        const btcValue = 1;
        const usValue = btcValue * 6353.44;

        return (
            <div className="channel-wrapper">
                <div className="channel-img">
                    <img src={ChannelIcon} alt="channel" />
                </div>
                <div className="channel-description">
                    <div className="channel-name">
                        1 Scala Chip Frappuccino
                    </div>
                    <div className="channel-to">
                        Connected with:<span> 03933884aaf1d6b1108397e5efe5c86bcfe5c86b</span>
                    </div>
                </div>
                <div className="channel-state">
                    <span>Current state</span>
                    <div className="state-btn">normal</div>
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
