import React, { Component } from 'react';
import { getInfo } from '../services/api';

class PlugWallet extends Component {
    componentDidMount() {
        getInfo().then((bool) => this.props.setConnected(!!bool));
    }

    componentDidUpdate() {
        setTimeout(function() {
            if (!this.props.connected) {
                getInfo().then((bool) => this.props.setConnected(false));
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
