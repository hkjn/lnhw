import React, { Component } from 'react';
import Channel from './Channel';
import Payment from './Payment';

import '../assets/css/homepage.css';

class Homepage extends Component {
    render() {
        const peers = this.props.peers || [];
        const payments = this.props.payments || [];
        return (
            <div id="homepage-wrapper">
                <div className="title-container">
                    <div className="title-tab selected-title-tab">
                        My channels
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
                    let channelsHtml = [];
                    const channels = peer.channels || [];

                    channels.map((channel) => {
                         const elem = (
                             <Channel
                                 key={channel.channel_id}
                                 connected={peer.connected}
                                 peerId={peer.id}
                                 channelId={channel.channel_id}
                                 funds={channel.msatoshi_to_us}
                                 channelState={channel.state}

                             />
                         )

                         channelsHtml = [...channelsHtml, elem];
                    })

                    return channelsHtml;


                })}

            {/*<table>
                    <tr>
                        <th>Id</th>
                        <th>Msatoshi</th>
                        <th>Destination</th>
                        <th>Unix Timestamp</th>
                        <th>Status</th>
                    </tr>
                    {payments.map((payment) => {
                        return (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{payment.msatoshi}</td>
                                <td>{payment.payment_hash}</td>
                                <td>{payment.timestamp}</td>
                                <td>{payment.status}</td>
                            </tr>
                        )
                    })}
                </table> */}


                <div className="title-container">
                    <div className="title-tab selected-title-tab">
                        Payments
                    </div>
                </div>
                {payments.reverse().map((payment) => {
                    return (
                        <Payment
                            key={payment.id}
                            paymentId={payment.id}
                            value={payment.msatoshi}
                            hash={payment.payment_hash}
                            timestamp={payment.timestamp}
                            status={payment.status}
                        />
                    )

                }
                )}
            </div>
        );
    }
}

export default Homepage;
