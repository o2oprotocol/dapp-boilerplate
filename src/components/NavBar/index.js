import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transparentClass: 'navbar-transparent',
      allowTransparent: true
    };
    this.handleScroll = this
      .handleScroll
      .bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const scrollTop = event.srcElement.documentElement.scrollTop;
    const {colorOnScroll} = this.props;
    const scrollDistance = colorOnScroll || 500;
    this.setState({
      allowTransparent: scrollTop < scrollDistance
    });
  }

  render() {
    return (
      <nav
        className={`navbar navbar-default navbar-fixed-top ${this.state.allowTransparent
        ? this.state.transparentClass
        : ''}`}>
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
                <Link to="/my-purchases" className="nav-item nav-link">My Purchases</Link>
              </li>
              <li>
                <Link to="/my-listings" className="nav-item nav-link">My Listings</Link>
              </li>
              <li>
                <Link to="/create" className="nav-item nav-link">
                  <i className="fa fa-plus-circle" style={{marginRight: '2px', fontSize: '13px'}}></i>
                  Add Listing
                </Link>
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
