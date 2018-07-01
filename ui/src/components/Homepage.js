import React, { Component } from 'react';
import Channel from './Channel';

import '../assets/css/homepage.css';

class Homepage extends Component {
    render() {
        const peers = this.props.peers || [];
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
                        className="pay-invoice-btn"
                        onClick={() => this.props.handleTogglePayInvoice()}
                    >
                        Pay invoice
                    </div>
                    <div
                        className="new-channel-btn"
                        onClick={() => this.props.handleToggleNewChannel()}
                    >
                        Open new channel
                    </div>
                </div>
                {peers.map((peer) => {
                    console.log(peer);
                    let channelsHtml = [];
                    const channels = peer.channels.map || [];

                    channels.map((channel) => {
                         const elem = (
                             <Channel
                                 connected={peer.connected}
                                 peerId={peer.id}
                                 channelId={channel.channel_id}
                                 funds={channel.msatoshi_total - channel.msatoshi_to_us}

                             />
                         )

                         channelsHtml = [...channelsHtml, elem];
                    })

                    return channelsHtml;


                })}
                <p>Connected to Network: {this.props.network}</p>
            </div>
        );
    }
}

export default Homepage;
