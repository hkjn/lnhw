import React, { Component } from 'react';

class Homepage extends Component {
    render() {
        return (
            <div>
                yo i am {this.props.connected ? ' connected' : 'not connected'}
            </div>
        );
    }
}

export default Homepage;
