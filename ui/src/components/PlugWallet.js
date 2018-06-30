import React, { Component } from 'react';
import { fetchIsConnected } from '../services/api';

class PlugWallet extends Component {
    componentDidMount() {
        fetchIsConnected().then((bool) => this.props.setConnected(false));
    }

    componentDidUpdate() {
        setTimeout(function() {
            if (!this.props.connected) {
                fetchIsConnected().then((bool) => this.props.setConnected(false));
            } else {
                clearTimeout();
            }
        }.bind(this), 1000);
    }

    render() {
        console.log(this.props);
        return (
            <div>
            </div>
        );
    }
}

export default PlugWallet;
