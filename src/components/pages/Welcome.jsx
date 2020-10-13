import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'

class Welcome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  };
  
  render() {

    return (
      <div className ="coverPage text-center cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <h1 className="coverHeading">Cover your page.</h1>
        <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        <p className="lead">
        <a href="#" className="btn btn-lg btn-secondary">Learn more</a>
        </p>
      </div>
    );
  };

};

export default Welcome;