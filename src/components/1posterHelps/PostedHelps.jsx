import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BroswerRouter as Router, Link } from 'react-router-dom';

class PosterHelps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      helps: [],
    };

  };

  componentDidMount(){
    // console.log(this.props.user)
    this.axiosCancelSource = axios.CancelToken.source()
    axios.get(`http://localhost:3001/activeHelps/${localStorage.userId}`, {cancelToken: this.axiosCancelSource.token})
    .then(response => {
      // console.log(response.data)
      this.setState({
        helps: response.data,
      })
    })
  }
  
  componentWillUnmount() {
    this.axiosCancelSource.cancel('Axios request canceled.')
  };

  displayHelp = (helps) => {
    // console.log(helps)
    return helps && helps.map(help => {
      // console.log(help)
      return (
        <div key ={help.id}>
          <h4>
            Title: {help.title}
          </h4>  
          <Link to ={`/postedhelp/${help.id}`}>
            More info
          </Link>    
        </div>
      )
    })
  }

  render() {

    return (
      <div>
        <div>
          <p>Hi David</p>
          <h1>List of active post(s)</h1>
          {this.displayHelp(this.state.helps)}
        </div>
      </div>
    )
  };
};

export default PosterHelps; 