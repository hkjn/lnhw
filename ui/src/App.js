import React, { Component } from 'react';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import PlugWallet from './components/PlugWallet.js';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
        };

        this.setConnected = this.setConnected.bind(this);
    }

    setConnected(isConnected) {
        this.setState({
            connected: isConnected,
        })
    }

    render() {
        const connected = this.state.connected;
        return (
            <div className="App">
                <Header connected={connected} />
                <Homepage connected={connected} />
                <PlugWallet
                    connected={connected}
                    setConnected={this.setConnected}
                />
            </div>
        );
    }
}

export default App;
