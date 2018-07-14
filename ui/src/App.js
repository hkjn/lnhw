import React, { Component } from 'react';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import NewChannel from './components/NewChannel';

import { getInfo, listPeers, listFunds, listPayments, listInvoices } from './services/api.js';

import PlugWallet from './components/PlugWallet.js';
import PayInvoice from './components/PayInvoice.js';
import NewAddress from './components/NewAddress.js';
import Withdraw from './components/Withdraw.js';

import './App.css';

const calcUserLnFundsBasedOnPeers = (peers = []) => {
    let funds = 0;

    const pArr = peers.length ? peers : [];

    pArr.map((peer) => {
        return (peer.channels || []).map((channel) => {
            funds += channel.msatoshi_to_us;
        })
    })

    return funds;
}

const calcUserOnChainFundsBasedOnOutputs = (outputs = []) => {
    let coins = 0;

    const pArr = outputs.length ? outputs : [];

    pArr.map((output) => {
        return coins += output.value;
    })

    return coins;
}


class App extends Component {
    constructor(props) {
        super(props);

        this.setMainState = this.setMainState.bind(this);
        this.handleToggleWithdraw = this.handleToggleWithdraw.bind(this);
        this.handleToggleNewAddress = this.handleToggleNewAddress.bind(this);
        this.handleToggleNewChannel = this.handleToggleNewChannel.bind(this);
        this.handleTogglePayInvoice = this.handleTogglePayInvoice.bind(this);

        this.state = {
            //  Warning: do not remove this one
            openNewAddress: false,
            openNewChannel: false,
            openPayInvoice: false,

            info: {},
            peers: {},
            outputs: {},
            payments: [],
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
                this.setState({ outputs: res.data.outputs })
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

    handleToggleWithdraw() {
        this.setState({ openWithdraw: !this.state.openWithdraw });
    }

    handleToggleNewAddress() {
        this.setState({ openNewAddress: !this.state.openNewAddress });
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

        const userFunds = calcUserLnFundsBasedOnPeers(this.state.peers);
        const userCoins = calcUserOnChainFundsBasedOnOutputs(this.state.outputs);
        console.log("User coins:", userCoins);
        console.log("User funds:", userFunds);

        return (
            <div className="App">
                <Header
                    connected={connected}
                    network={this.state.info.network}
                    userFunds={userFunds}
                    userCoins={userCoins}
                />
                <Homepage
                    payments={this.state.payments}
                    handleToggleWithdraw={this.handleToggleWithdraw}
                    handleToggleNewAddress={this.handleToggleNewAddress}
                    handleToggleNewChannel={this.handleToggleNewChannel}
                    handleTogglePayInvoice={this.handleTogglePayInvoice}
                    peers={this.state.peers.length ? this.state.peers : []}
                    outputs={this.state.outputs.length ? this.state.outputs : []}
                />
                <PlugWallet
                    connected={connected}
                    setMainState={this.setMainState}
                />
                <Withdraw
                    openWithdraw={this.state.openWithdraw}
                    handleToggleWithdraw={this.handleToggleWithdraw}
                />
                <NewChannel
                    openNewChannel={this.state.openNewChannel}
                    handleToggleNewChannel={this.handleToggleNewChannel}
                />
                <PayInvoice
                    openPayInvoice={this.state.openPayInvoice}
                    handleTogglePayInvoice={this.handleTogglePayInvoice}
                />
                <NewAddress
                    openNewAddress={this.state.openNewAddress}
                    handleToggleNewAddress={this.handleToggleNewAddress}
                />
            </div>
        );
    }
}

export default App;
