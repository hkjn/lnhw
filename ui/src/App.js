import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import { getInfo } from './services/api.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        getInfo()
            .then(res => {
                this.setState(res.data)
            })
    }

    render() {
        const connected = this.state.connected;
        return (
            <div className="App">
                <Header connected={connected} />
                <Homepage connected={connected} />
                <p>Connected to Network: {this.state.network}</p>
                {/* <PlugWallet connected={connected} /> */}
            </div>
        );
    }
}

export default App;
