import React, { Component } from 'react';
import HomeIcon from '../assets/img/home-icon.svg';
import DeviceIcon from '../assets/img/chip.svg';
import LnIcon from '../assets/img/shape.svg';

import { convertMSatToObv } from '../services/helper.js';

import '../assets/css/header.css';


class Header extends Component {
    render() {
        const { value, curr } = convertMSatToObv(this.props.userFunds || 0);
        const _balance = value ? value : '-';
        const connected = this.props.connected;
        const network = this.props.network;

        return (
            <header>
                <div className="header-logo" />


                <div className="header-main" >
                    <div className="home-icon-container">
                        <img src={HomeIcon} alt="home" />
                        <span>Home</span>
                        <span className="floating-network">aaa{network}</span>
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
                        <span>Balance</span>
                        <label><img src={LnIcon} alt="ln"/> {_balance} {curr}</label>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
