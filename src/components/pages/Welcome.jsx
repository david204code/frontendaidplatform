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
        <h1 className="coverHeading">Aid Platform</h1>
        <p className="lead">
          We are connecting people and buidling a community in a time of need and also in the time of goodness. Whether you want to provide generous help or recieve help in time of difficulties....
        </p>
        <p className="lead">
          <Link
            to ="/getInvolved"
            className ="btn btn-lg btn-secondary"
            role ="button"
          >
            Get Involved now!
          </Link>
        </p>
      </div>
    );
  };

};

export default Welcome;