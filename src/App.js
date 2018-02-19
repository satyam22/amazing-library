// import React, { Component } from 'react';
// import './App.css';
// import Header from './Header';
// import Main from './Main';
// export default class App extends Component {
//   render() {
//     return (
//       <div>
//       <Header />
//       <Main />
//       </div>
//     );
//   }
// }

import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

class MousePositionProvider extends React.Component {
  constructor( ) {
    super();
    this.state = { };
    this.onMouseMove = this.onMouseMove.bind( this );
  }

  getChildContext() {
    return { 
      posX: this.state.posX,
      posY: this.state.posY
    };
  }

  componentDidMount( ) {
    window.addEventListener( "mousemove", this.onMouseMove );
  }

  onMouseMove( e ) {
    this.setState({ posX: e.clientX, posY: e.clientY });
  }

  render( ) {
    return this.props.children
  }
}

MousePositionProvider.childContextTypes = {
  posX: PropTypes.number,
  posY: PropTypes.number
};



class MousePositionConsumer extends React.Component {
  render( ) {
    return (
      <div>Your position is ( {this.context.posX},{this.context.posY} )</div>
    )
  }
}

MousePositionConsumer.contextTypes = {
  posX: PropTypes.number,
  posY: PropTypes.number
};



const  App = () => (
  <MousePositionProvider>
    <div>
      <MousePositionConsumer />
      <MousePositionConsumer />
    </div>
  </MousePositionProvider>
);

export default App;
