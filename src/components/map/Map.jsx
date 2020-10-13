import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Map extends React.Component {

  _isMounted =false;

  constructor(props) {
    super(props);

    this.state = {
      
    };


  };

  render() {
    
    return(
      <div>
        <h1 className ="display-2">Map Component</h1>
      </div>
    );
  };
};

export default Map;

