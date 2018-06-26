import React, { Component } from 'react';
import Header from './header/Header';
import Widget from './widget/Widget';
import Content from './content/Content';
import Footer from './footer/Footer';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <Widget/>
          <Content/>
          <Footer/>
      </div>
    );
  }
}

export default App;
