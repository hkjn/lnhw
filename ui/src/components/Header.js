import React, { Component } from 'react';

class Header extends Component {
    render() {
        const connected = this.props.connected;

        return (
            <header>
                <div className="header-logo" />
                <div className="header-balance" />
            </header>
        );
    }
}

export default Header;
