import React, { Component } from 'react';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
// import { getInfo, pay } from './services/api.js';

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

    // componentDidMount() {
    //     getInfo()
    //         .then(res => {
    //             this.setState(res.data)
    //         })
        // const bolt11 = 'lnbc2500u1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5xysxxatsyp3k7enxv4jsxqzpuaztrnwngzn3kdzw5hydlzf03qdgm2hdq27cqv3agm2awhz5se903vruatfhq77w3ls4evs3ch9zw97j25emudupq63nyw24cg27h2rspfj9srp'
        // pay(bolt11)
    // }

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
