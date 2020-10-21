import React from 'react';
import axios from 'axios';
import { BroswerRouter as Router, Link } from 'react-router-dom';

class AcceptedHelps extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      acceptedhelps: [],
    };

  };

  componentDidMount() {
    this.axiosCancelSource = axios.CancelToken.source()
    axios.get(`http://localhost:3001/activeAcceptedHelps/${localStorage.userId}`, {cancelToken: this.axiosCancelSource.token})
    .then(response => {
      // console.log(response.data)
      this.setState({
        acceptedhelps: response.data,
      })
    })
  }

  componentWillUnmount() {
    this.axiosCancelSource.cancel('Axios request canceled.')
  }

  displayAcceptedHelp = (acceptedhelps) => {
    // console.log(acceptedhelps)
    return acceptedhelps && acceptedhelps.map(acceptedhelp => {
      // console.log(acceptedhelp)
      return (
        <div key ={acceptedhelp.id}>
          <h4>
            Title: {acceptedhelp.help.title}
          </h4>
          <Link to ={`/acceptedhelp/${acceptedhelp.id}`}>
            More infor
          </Link>
        </div>
      )
    })
  }

  render() {

    return (
      <div>
        <div>
          <p>AcceptedHelps homepage</p>
          <h1>List of active request(s)</h1>
          {this.displayAcceptedHelp(this.state.acceptedhelps)}
        </div>
      </div>
    )
  };
};

export default AcceptedHelps;