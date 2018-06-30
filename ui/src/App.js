import React, { Component } from 'react';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import { getInfo, listPeers, listFunds, listPayments, listInvoices } from './services/api.js';

import PlugWallet from './components/PlugWallet.js';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.setMainState = this.setMainState.bind(this);

        this.state = {
            info: {},
            peers: {},
            funds: {},
            payments: {},
            invoices: {},
        };
    }

    componentDidMount() {
        getInfo()
            .then(res => {
                this.setState({ info: res.data })
            })
        listPeers()
            .then(res => {
                this.setState({ peers: res.data.peers })
            })
        listFunds()
            .then(res => {
                this.setState({ funds: res.data })
            })
        listPayments()
            .then(res => {
                this.setState({ payments: res.data.payments })
            })
        listInvoices()
            .then(res => {
                this.setState({ invoices: res.data.invoices })
            })
    }

    setMainState(state) {
        this.setState({ info: state });
    }

    render() {
        // FIXME: this flag isn't implemented yet
        // const connected = this.state.info.connected;

        const connected = true;

        return (
            <div className="App">
                <Header connected={connected} />
                <Homepage network={this.state.info.network} />
                <PlugWallet
                    connected={connected}
                    setMainState={this.setMainState}
                />
            </div>
        );
    }
}

export default App;
