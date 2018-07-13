import React, { Component } from 'react';
import { getNewAddress } from '../services/api';

import '../assets/css/pay-invoice.css';

class NewAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, address) {
        event.preventDefault();
        getNewAddress()
            .then(r => {
                if (r.data.status === 'failure') {
                    alert(r.data.detail)
                }
                else {
                    this.setState({ address: r.data.address });
                }
            })
    }
   

    render() {
        if(!this.props.openNewAddress) {
            return null;
        }

        const address = this.state.address;
        
        return (
            <div>
                <div
                    id="new-address-wrapper"
                    onClick={() => this.props.handleToggleNewAddress()}
                />
                <div id="new-invoice-form-container">
                    <div className="form-pi-title">New Address</div>
                    <div className="balance-container">
                        Addr: {address}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="input-btn"
                            type="submit"
                            value="Get New Address"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default NewAddress;
