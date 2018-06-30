import React, { Component } from 'react';
import Channel from './Channel';

import '../assets/css/homepage.css';

class Homepage extends Component {
    render() {

        return (
            <div id="homepage-wrapper">
                <div className="title-container">
                    <div className="title-tab selected-title-tab">
                        My channels
                    </div>
                    <div className="title-tab">
                        Transaction history
                    </div>
                    <div className="title-tab">
                        My bitcoin address
                    </div>
                    <div
                        className="new-channel-btn"
                        onClick={() => alert("Work in progress!!")}
                    >
                        Open new channel
                    </div>
                </div>
                <Channel />
                <p>Connected to Network: {this.props.network}</p>
            </div>
        );
    }
}

export default Homepage;
