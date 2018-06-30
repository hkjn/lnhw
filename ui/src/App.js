import React, { Component } from 'react';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import { getInfo } from './services/api.js';
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
