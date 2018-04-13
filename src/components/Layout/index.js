import React, {Fragment, Component} from 'react';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

class Layout extends Component {
  render() {
    const {children} = this.props;
    return (
      <Fragment>
        <NavBar colorOnScroll={200}/>
        {children}
        <Footer/>
      </Fragment>
    );
  }
}

export default Layout;
