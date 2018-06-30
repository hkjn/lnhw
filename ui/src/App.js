import React, { Component } from 'react';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import { getInfo, pay } from './services/api.js';
import PlugWallet from './components/PlugWallet.js';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setConnected = this.setConnected.bind(this);
    }

    componentDidMount() {
        getInfo()
            .then(res => {
                this.setState(res.data)
            })
        const bolt11 = 'lnbc2500u1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5xysxxatsyp3k7enxv4jsxqzpuaztrnwngzn3kdzw5hydlzf03qdgm2hdq27cqv3agm2awhz5se903vruatfhq77w3ls4evs3ch9zw97j25emudupq63nyw24cg27h2rspfj9srp'
        pay(bolt11)
    }

    setConnected(isConnected) {
        this.setState({
            connected: isConnected,
        })
    }

    render() {
        const connected = this.state.network;
        return (
            <div className="App">
                <Header connected={connected} />
                <Homepage connected={connected} />
                <p>Connected to Network: {this.state.network}</p>
                <PlugWallet
                    connected={connected}
                    setConnected={this.setConnected}
                />
            </div>
        );
    }
}

export default App;
