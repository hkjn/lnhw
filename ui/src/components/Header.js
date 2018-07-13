import React, { Component } from 'react';
import HomeIcon from '../assets/img/home-icon.svg';
import DeviceIcon from '../assets/img/chip.svg';
import LnIcon from '../assets/img/shape.svg';

import { convertMSatToObv, convertSatToObv } from '../services/helper.js';

import '../assets/css/header.css';


class Header extends Component {
    render() {
        const onChain = convertSatToObv(this.props.userCoins || 0);
        const _onChain = onChain.value ? onChain.value : '-';
        const offChain = convertMSatToObv(this.props.userFunds || 0);
        const _offChain = offChain.value ? offChain.value : '-';
        const connected = this.props.connected;
        const network = this.props.network;

        return (
            <header>
                <div className="header-logo" />


                <div className="header-main" >
                    <div className="home-icon-container">
                        <img src={HomeIcon} alt="home" />
                        <span>Home</span>
                        <span className="floating-network">{network}</span>
                    </div>
                    <div className="device-container">
                        <div className="device-icon-container">
                            <img src={DeviceIcon} alt="device" />
                            <span>Device</span>
                        </div>
                        <div className={`check-connected ${!connected  ? 'not-connected' : ''}`}>
                            {connected  ? 'Connected' : 'Not connected'}
                        </div>
                    </div>
                </div>
                <div className="header-balance" >
                    <div className="balance-container">
                        <span>LN Balance</span>
                        <label><img src={LnIcon} alt="ln"/> {_offChain} {offChain.curr}</label>
                        <span>On Chain Balance</span>
                        <label>{_onChain} {onChain.curr}</label>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
