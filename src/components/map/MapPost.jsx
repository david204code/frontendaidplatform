import React from 'react';
import axios from 'axios';
import ReactMapGL, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SetPin from './SetPin.jsx';
import { Link } from 'react-router-dom';

const TOKEN = 'pk.eyJ1IjoiZGF2aWQyMDRjb2RlMSIsImEiOiJjazc2YjdobGUwOTI0M2VvamwwZXpvZGR1In0.FSpShMuhbroEHA9-0iG4sg';

class Help extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "", 
      description: "",
      request_type: "",
      location_long: "",
      location_lat: "",
      // status: "",
      volunteeringErrors: "",

      viewport: {
        longitude: -0.140,
        latitude: 51.508,
        zoom: 14,
        bearing: 0,
        pitch: 0
      },
      marker: {
        longitude: -0.140,
        latitude: 51.508
      },
      event: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  _logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat
      }
    });
  }

  _onMarkerDragEnd = event => {
    this._logDragEvent('onDragEnd', event);
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
    this.setState({
      location_long: event.lngLat[0], location_lat: event.lngLat[1] 
    })
    // console.log("Longitude:",event.lngLat[0], "Latitude:", event.lngLat[1]);
  };

  handleSubmit(event) {
    event.preventDefault();
    const csrfToken = document.querySelector('[name=csrf-token]')
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    
    axios
    .post("http://localhost:3001/helps",
      {
        help: {
          title: this.state.title,
          description: this.state.description,
          request_type: this.state.request_type,
          location_long: this.state.location_long,
          location_lat: this.state.location_lat,
          // status: this.state.status
        }
      },

      { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        // console.log("help request submitted")
      }
    }).catch(error => {
      console.log("registration", error);
    });
    alert("Congrgulation on volunteering")
    // this.props.history.push("/map");
    this.props.history.push("/dashboard");
    // window.location.reload(); 
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  } 

  render() {
    const { marker} = this.state;
    return (
      <div>
        <div className ="jumbotron jumbotron-fluid text-center">
          <h1 className ="display-4">Thank you for Volunteering!</h1>
          <p className ="lead">We are excited you want to volunteer. Fill in the form below</p>
          <div className ="offset-2">
            <h4 className ="text-left lead">Hello {this.props.user.email} </h4>
          </div>
        </div>

        <div className ="container">
          <div className ="text-center pb-4">
            <Link
              to ="/map"
              className =""
              role ="button"
            >
              <button className ="btn btn-outline-info">
                Back to the map
              </button> 
            </Link>
          </div>
          <div className ="offset-md-1">
            <p className ="text-center lead">
              Drag and drop the marker to your position to let others know where you
              are located in your community.
            </p>
            <ReactMapGL
              {...this.state.viewport}
              width="70vw"
              height="60vh"
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={viewport => this.setState({viewport})}
              mapboxApiAccessToken={TOKEN}
              // onClick ={this.onClickMap}
              // onDblClick ={this.onDblClick}
              doubleClickZoom ={false}
              >
              <Marker 
                longitude={marker.longitude} 
                latitude={marker.latitude} 
                offsetLeft={-20} 
                offsetTop={-10}
                draggable
                onDragStart={this._onMarkerDragStart}
                onDrag={this._onMarkerDrag}
                onDragEnd={this._onMarkerDragEnd}
                >
                <SetPin size={20} />
              </Marker>
            </ReactMapGL>
          </div>

          <div className ="row py-4">
            <div className ="col-md-8 offset-md-2 text-center">
              <form onSubmit={this.handleSubmit}>
                <div className ="row text-center pb-4 lead">
                  <div className ="col-md-4 offset-md-2">
                    <label>Marker's Longitude</label>
                      <input
                        type ="text"
                        name ="location_long"
                        className ="form-control"
                        placeholder ="location_long"
                        required
                        value ={this.state.location_long}
                        onChange ={this.handleChange}
                      />
                  </div>

                  <div className ="col-md-4">
                    <label>Marker's Latitude</label>
                    <input
                      type ="text"
                      name ="location_lat"
                      className ="form-control"
                      placeholder ="location_lat"
                      required
                      value ={this.state.location_lat}
                      onChange ={this.handleChange}
                    />
                  </div>
                </div>

                <div className ="form-group col-md-4 offset-md-4 lead">
                  <h1 className =""> 
                    Volunteer 
                  </h1>
                  <label htmlFor ="volTitle">Title</label>
                  <input
                    type ="text"
                    name ="title"
                    id ="volTitle"
                    className ="form-control"
                    placeholder ="title of request"
                    required
                    value ={this.state.title}
                    onChange ={this.handleChange}
                  />
                </div>          

                <div className ="form-group lead">
                  <label htmlFor ="volDescription">Description</label>
                    <textarea
                      type ="text"
                      name ="description"
                      id ="volDescription"
                      className ="form-control"
                      placeholder ="Describe what you will be providing, the more the detail the better"
                      rows ="5"
                      required
                      value ={this.state.description}
                      onChange ={this.handleChange}
                    />
                </div>

                <div className ="col-md-4 offset-md-4 pb-2 lead">
                  <label htmlFor ="volType">Type of Request:
                  </label>
                  <select 
                    name="request_type"
                    className="form-control"
                    required
                    value={this.state.value}
                    onChange ={this.handleChange}
                    defaultValue={'DEFAULT'}
                  >
                    <option value='DEFAULT' disabled></option>
                    <option value ="one-time">One-Time task</option>
                    <option value ="material-need">Material-Need</option>
                  </select>
                </div>
                <button type ="submit" className ="btn btn-outline-success btn-lg my-4">Volunteer</button>
              </form>
            </div>
          </div>

        </div>
      </div>

    );
  };
};

export default Help;