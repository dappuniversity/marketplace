import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dcensus.site"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dcensus
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://nochild.censusdapp.site/"
          target="_blank"
          rel="noopener noreferrer"
        >
          no child agreement
        </a> 
      </nav>
    );
  }
}

export default Navbar;
