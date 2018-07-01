import React, { Component } from 'react';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import NewChannel from './components/NewChannel';

import { getInfo, listPeers, listFunds, listPayments, listInvoices } from './services/api.js';

import PlugWallet from './components/PlugWallet.js';
import PayInvoice from './components/PayInvoice.js';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.setMainState = this.setMainState.bind(this);
        this.handleToggleNewChannel = this.handleToggleNewChannel.bind(this);
        this.handleTogglePayInvoice = this.handleTogglePayInvoice.bind(this);

        this.state = {
            //  Warning: do not remove this one
            openNewChannel: false,
            openPayInvoice: false,

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

    handleToggleNewChannel() {
        this.setState({ openNewChannel: !this.state.openNewChannel });
    }

    handleTogglePayInvoice() {
        this.setState({ openPayInvoice: !this.state.openPayInvoice });
    }


    render() {
        const connected = true;
        console.log(this.state);

        // const connected = this.state.info.hardwarewallet === 'connected';

        return (
            <div className="App">
                <Header connected={connected} />
                <Homepage
                    network={this.state.network}
                    handleToggleNewChannel={this.handleToggleNewChannel}
                    handleTogglePayInvoice={this.handleTogglePayInvoice}
                    peers={this.state.peers.length ? this.state.peers : []}
                />
                <PlugWallet
                    connected={connected}
                    setMainState={this.setMainState}
                />
                <NewChannel
                    openNewChannel={this.state.openNewChannel}
                    handleToggleNewChannel={this.handleToggleNewChannel}
                />
                <PayInvoice
                    openPayInvoice={this.state.openPayInvoice}
                    handleTogglePayInvoice={this.handleTogglePayInvoice}
                />
            </div>
        );
    }
}

export default App;
