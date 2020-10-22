import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  };

  handleLogOutClick() {
    axios.delete("http://localhost:3001/logout", { withCredentials: true})
    .then(response => {
      this.props.handleLogOut();
      this.props.history.push('/')
    })
    .catch(error => {
      console.log("logout error", error);
    });
  };

render() {

  return (
    <header className ="">
      <div className="">
        <h3 className="">Aid Platform</h3>
          <nav className="nav nav-masthead justify-content-center">
            <Link
              to ="/welcome"
              className ="nav-link active"
              role ="button"
            >
              Welcome
            </Link>

            <Link
              to ="/getInvolved"
              className ="nav-link active"
              role ="button"
            >
              Get Involved
            </Link>
            
            <Link 
              to ="/map"
              className ="nav-link active"
              role ="button"
            >
              Map
            </Link>
            <Link
              to ="/dashboard"
              className ="nav-link active"
              role ="button"
            >
              Dashboard
            </Link>

            {
              this.props.isLoggedin ? 
                <button onClick={() => this.handleLogOutClick()}>Logout</button> :
              null
            }
        </nav>
      </div>
    </header>
  )
}

};

export default Navbar;