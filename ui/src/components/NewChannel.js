import React, { Component } from 'react';
import { fundChannel } from '../services/api';

import '../assets/css/new-channel.css';

class PlugWallet extends Component {
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
        fundChannel(this.state.address, this.state.amount)
            .then(r => {
                if (r.data.status === 'failure') {
                    alert(r.data.detail)
                }
                else {
                    window.location.reload()
                }
            })
    }

    render() {
        if(!this.props.openNewChannel) {
            return null;
        }

        return (
            <div>
                <div
                    id="new-channel-wrapper"
                    onClick={() => this.props.handleToggleNewChannel()}
                />
                <div id="new-channel-form-container">
                    <div className="form-nc-title">Create a lightning channel</div>
                    <form onSubmit={this.handleSubmit}>
                        <label className="input-label">
                            Node ID:
                            <input
                                type="text"
                                value={this.state.address}
                                onChange={(evt) => this.handleChange(evt, 'address')}
                            />
                        </label>
                        <label className="input-label">
                            Amount (SAT):
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

export default PlugWallet;
