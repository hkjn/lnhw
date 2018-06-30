import React, { Component } from 'react';

class Homepage extends Component {
    render() {
        return (
            <div>
                <p>Connected to Network: {this.props.network}</p>
            </div>
        );
    }
}

export default Homepage;
