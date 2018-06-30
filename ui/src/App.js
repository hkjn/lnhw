import React, { Component } from 'react';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import PlugWallet from './components/PlugWallet.js';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.setMainState = this.setMainState.bind(this);

        this.state = {
            network: '',
        };
    }

    setMainState(state) {
        this.setState(state);
    }

    render() {
        const connected = !!this.state.network;
        return (
            <div className="App">
                <Header connected={connected} />
                <Homepage network={this.state.network} />
                <PlugWallet
                    connected={connected}
                    setMainState={this.setMainState}
                />
            </div>
        );
    }
}

export default App;
