import React, { Component } from 'react';
import ChannelIcon from '../assets/img/channel-icon.svg';

import '../assets/css/channel.css';

import { convertSatToObv } from '../services/helper.js';

class OnChain extends Component {
    render() {
        const { value, curr } = convertSatToObv(this.props.value || 0);

        const usValue = this.props.value / 10**8 * 6353.44;

        const _usValue = Number(usValue).toFixed(2)

        return (
            <div className="channel-wrapper">
                <div className="channel-img">
                    <img src={ChannelIcon} alt="channel" />
                </div>
                <div className="channel-description">
                    <div className="channel-name">
                        {this.props.txId}
                    </div>
                    <div className="channel-to">
                        Address:<span> {this.props.address}</span>
                    </div>
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

export default OnChain;
