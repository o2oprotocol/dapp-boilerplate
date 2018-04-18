import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transparentClass: 'navbar-transparent',
      allowTransparent: true,
      toggle: false
    };
    this.handleScroll = this
      .handleScroll
      .bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('click', this.handleDocumentClick);
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

  handleDocumentClick(event) {
    if (this.state.toggle) {
      this.toggleNavBar(!this.state.toggle);
    }
  }

  handleNavBarToggle() {
    const toggle = !this.state.toggle;
    this.setState({ toggle: toggle });
    this.toggleNavBar(toggle);
  }

  toggleNavBar(toggle) {
    if (toggle) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
  }

  handleNavClick(event) {
    event.stopPropagation();
  }

  closeNav() {
    this.toggleNavBar(false)
  }

  render() {
    return (
      <nav
        className={`navbar navbar-default navbar-fixed-top ${this.state.allowTransparent
        ? this.state.transparentClass
        : ''}`}
        onClick={this.handleNavClick.bind(this)}>
        <div className="container">
          <div className="navbar-header">
            <button
              id="menu-toggle"
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              onClick={this.handleNavBarToggle.bind(this)}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar bar1"/>
              <span className="icon-bar bar2"/>
              <span className="icon-bar bar3"/>
            </button>
            <a href="/" className="navbar-brand">
              Blockchain DApp
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right navbar-uppercase">
              <li onClick={this.closeNav.bind(this)}>
                <Link to="/my-purchases" className="nav-item nav-link">My Purchases</Link>
              </li>
              <li onClick={this.closeNav.bind(this)}>
                <Link to="/my-listings" className="nav-item nav-link">My Listings</Link>
              </li>
              <li onClick={this.closeNav.bind(this)}>
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
