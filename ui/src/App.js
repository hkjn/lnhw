import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import Homepage from './components/Homepage.js';
import { getPerson } from './services/api.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
        };
    }

    componentDidMount() {
        getPerson();
    }

    render() {
        const connected = this.state.connected;
        return (
            <div className="App">
                <Header connected={connected} />
                <Homepage connected={connected} />
                {/* <PlugWallet connected={connected} /> */}
            </div>
        );
    }
}

export default App;
