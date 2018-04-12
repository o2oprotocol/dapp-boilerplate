import React, {Fragment, Component} from 'react'
import Header from 'components/Header';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

class Layout extends Component {
  render() {
    const {children} = this.props;
    return (
      <Fragment>
        <NavBar/>
        <Header/>
        {children}
        <Footer/>
      </Fragment>
    );
  }
}

export default Layout;
