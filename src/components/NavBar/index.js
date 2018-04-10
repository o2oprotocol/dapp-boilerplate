import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-default navbar-transparent navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              id="menu-toggle"
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#example">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar bar1"/>
              <span className="icon-bar bar2"/>
              <span className="icon-bar bar3"/>
            </button>
            <a href="/" className="navbar-brand">
              DApp Boilerplate
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right navbar-uppercase">
              <li>
                <a href="/">About Us</a>
              </li>
              <li>
                <a
                  href="https://github.com/o2oprotocol/dapp-boilerplate"
                  className="btn btn-danger btn-fill">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
