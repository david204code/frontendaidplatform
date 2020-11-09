import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import Counter from '../Counter';

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedin: localStorage.isLoggedin,
    }

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  };

  handleLogOutClick() {
    axios.delete("https://aidplatformapiheroku.herokuapp.com/logout", 
    // { withCredentials: true}
    )
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
              to ="/"
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
            {console.log(this.state.isLoggedin)}
            {console.log(localStorage.isLoggedin) + " local storage"}
            {
              this.state.isLoggedin === 'true'
              ?<button onClick={() => this.handleLogOutClick()}>Logout</button> 
              :null
            }
          </nav>
          <Counter />
      </div>
    </header>
  )
}

};

export default Navbar;