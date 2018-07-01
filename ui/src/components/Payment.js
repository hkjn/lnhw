import React, { Component } from 'react';
import PaymentIcon from '../assets/img/bitcoin-logo.svg';

import '../assets/css/payment.css';

import { convertMSatToObv } from '../services/helper.js';

class Payment extends Component {
    render() {
        const { value, curr } = convertMSatToObv(this.props.value || 0);

        return (
            <div className="payment-wrapper">
                <div className="payment-img">
                    <img src={PaymentIcon} alt="payment" />
                </div>
                <div className="payment-description">
                    <div className="payment-name">
                        {this.props.hash}
                    </div>
                    <div className="payment-time">
                        Datetime:<span> {new Date(this.props.timestamp)}</span>
                    </div>
                </div>
                <div className="payment-state">
                    <span>Payment status</span>
                    <div className={`state-btn ${this.props.status}`}>{this.props.status}</div>
                </div>
                <div className="payment-balance">
                    <div className="balance-btc">
                            {value || 0}
                        <span>{curr}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;
