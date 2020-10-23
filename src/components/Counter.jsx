import React from 'react';
import axios from 'axios';

class Counter extends React.Component {
  constructor() {
    super()
    this.state = {
      count: '',
      intervalID: '',
    }
  }

  componentDidMount() {
    // axios.get(`http://localhost:3001/counter`)
    // .then( response => {
    //   // console.log(response.data)
    //   this.setState({count: response.data})
    //   this.intervalID = setTimeout(5000)
    // })
    // .catch(response => console.log(response))
    this.getCount();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getCount = () => {
    axios.get(`http://localhost:3001/counter`)
    .then( response => {
      // console.log(response.data)
      this.setState({count: response.data})
      this.intervalID = setTimeout(this.getCount.bind(this), 10000);
      // console.log('hi')
    })
    .catch(response => console.log(response))
  }

  render() {
    return(
      <div>
        <div>
          <h4 className ="text-center lead p-3">Number of Active Request: {this.state.count}</h4>
        </div>
      </div>
    )
  }
}

export default Counter;