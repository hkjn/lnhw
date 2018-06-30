import React, { Component } from 'react';
import HomeIcon from '../assets/img/home-icon.svg';
import DeviceIcon from '../assets/img/chip.svg';

import '../assets/css/header.css';


class Header extends Component {
    render() {
        //  TODO add balance
        const balance = "-";
        const connected = this.props.connected;

        return (
            <header>
                <div className="header-logo" />
                <div className="header-main" >
                    <div className="home-icon-container">
                        <img src={HomeIcon} />
                        <span>Home</span>
                    </div>
                    <div className="device-container">
                        <div className="device-icon-container">
                            <img src={DeviceIcon} />
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
                        <label>Ƀ {balance}</label>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
