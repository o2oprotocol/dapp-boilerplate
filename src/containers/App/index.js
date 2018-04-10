import React, {Component} from 'react';

import './index.css';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Header/>
        <Section/>
        <Footer/>
      </div>
    );
  }
}

export default App;
