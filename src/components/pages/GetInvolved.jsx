import React from 'react';
import { Link } from 'react-router-dom';
import './GetInvolved.css'

class GetInvolved extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  };

  render() {

    return (
      <div>
        <div className ="jumbotron">
          <div className ="container">
            <h1 className ="display-4 text-center">Get Involved now!</h1>
            <p className ="pt-2 text-center lead">
              Thank you for your interest. <br/>Help your community and grow your community by taking part! <br/>More information below.....
            </p>
            
            {
              // this.props.isLoggedin === 'false'
              (this.props.isLoggedin === 'false' || this.props.isLoggedin === undefined)
              ?
              <p className ="text-center">
                <Link
                  to ="/login"
                  className ="btn btn-lg btn-info mx-4 px-3"
                  role ="button"
                >
                  Login
                </Link>
                <Link
                  to ="/signup"
                  className ="btn btn-lg btn-light mx-4"
                  role ="button"
                >
                  Sign Up
                </Link>
              </p> 
              :null
            }
          </div>
        </div>

        <div className ="container">
            <div className ="text-center">
              <h4 className ="">Select an option below</h4>
            </div>
            <div className ="row py-4">
              <div className ="col-md-3 offset-md-3 text-center">
                <p className="lead">Browse the map for request</p>
                <Link to ="/map">
                  <button className ="btn btn-outline-primary btn-lg">
                    Map
                  </button>
                </Link>
              </div>  
              <div className ="col-md-3 text-center">
                <p className ="lead">Post your own request</p>
                <Link to ="/post">
                  <button className ="btn btn-outline-primary btn-lg">
                    Post
                  </button>
                </Link>
              </div>
            </div>
        </div>
      </div>
    )
  };

};

export default GetInvolved;