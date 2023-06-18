import React, { Component } from 'react';
import { withdraw } from '../services/api';

import '../assets/css/new-channel.css';

class Withdraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            address: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, input) {
        this.setState({ [input]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        withdraw(this.state.address, this.state.amount)
            .then(r => {
                if (r.data.status === 'failure') {
                    alert(r.data.detail)
                }
                else {
                    window.location.reload()
                }
            })

        // connect(this.state.address).then(r1 => {
        //     if (r1.data.status === 'failure') {
        //         alert(r1.data.detail)
        //     } else {
        //         setTimeout(function() {
        //             const pubKey = _this.state.address.split("@")[0];
        //             fundChannel(pubKey, this.state.amount)
        //             .then(r => {
        //                 if (r.data.status === 'failure') {
        //                     alert(r.data.detail)
        //                 }
        //                 else {
        //                     window.location.reload()
        //                 }
        //             })
        //         }.bind(this), 1000);
        //     }
        // })

    }

    render() {
        if(!this.props.openWithdraw) {
            return null;
        }

        return (
            <div>
                <div
                    id="new-channel-wrapper"
                    onClick={() => this.props.handleToggleWithdraw()}
                />
                <div id="new-channel-form-container">
                    <div className="form-nc-title">Withdraw</div>
                    <form onSubmit={this.handleSubmit}>
                        <label className="input-label">
                            <span className="span-address">Address</span>
                            <textarea
                                className="address-txtarea"
                                type="text"
                                value={this.state.address}
                                onChange={(evt) => this.handleChange(evt, 'address')}
                            />
                        </label>
                        <label className="input-label">
                            Amount (SAT)
                            <input
                                type="number"
                                value={this.state.amout}
                                onChange={(evt) => this.handleChange(evt, 'amount')}
                            />
                        </label>
                        <input
                            className="input-btn"
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default Withdraw;
