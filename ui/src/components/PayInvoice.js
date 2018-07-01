import React, { Component } from 'react';
import { pay } from '../services/api';

import '../assets/css/pay-invoice.css';

class PayInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, input) {
        this.setState({ [input]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        pay(this.state.invoice)
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
        if(!this.props.openPayInvoice) {
            return null;
        }

        return (
            <div>
                <div
                    id="new-invoice-wrapper"
                    onClick={() => this.props.handleTogglePayInvoice()}
                />
                <div id="new-invoice-form-container">
                    <div className="form-pi-title">Pay invoice</div>
                    <form onSubmit={this.handleSubmit}>
                        <label className="input-label">
                            Payment request (Bolt11):
                            <textarea
                                type="text"
                                value={this.state.invoice}
                                onChange={(evt) => this.handleChange(evt, 'invoice')}
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

export default PayInvoice;
