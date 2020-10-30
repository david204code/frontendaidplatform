import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapPin from './MapPin';
import Requests from './Requests';

const TOKEN = 'pk.eyJ1IjoiZGF2aWQyMDRjb2RlMSIsImEiOiJjazc2YjdobGUwOTI0M2VvamwwZXpvZGR1In0.FSpShMuhbroEHA9-0iG4sg';

class Map extends React.Component {

  _isMounted =false;

  constructor(props) {
    super(props);

    this.state = {
      helps: [],

      viewport: {
        longitude: -0.140,
        latitude: 51.508,
        zoom: 14,
        bearing: 0,
        pitch: 0
      },
      
      popupInfo: null,

    };

  };

  
  onClickMap(e) {
    // console.log(e.lngLat);
  }

  onDblClick(e) {
    // console.log("Hi", e.lngLat[0], e.lngLat[1]);
  }

  componentWillMount() {
    this._isMounted = true;
    axios.get(`https://aidplatformapiheroku.herokuapp.com/publish.json`)
    .then(data => {
      let info = []
      data.data.map( (data) => {
        info.push(
          {
            id: data.id,
            title: data.title,
            description: data.description,
            request_type: data.request_type,
            location_long: data.location_long,
            location_lat: data.location_lat,
            color: data.color,
            status: data.status
          }
        )
        if (this._isMounted) {
          this.setState({ helps: info })
        }
      })
    })
    .catch(data => {

    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  };

  _onClickMarker = helps => {
    this.setState({popupInfo: helps});
    // console.log(helps.location_lat);
  };

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={parseFloat(popupInfo.location_long)}
          latitude={parseFloat(popupInfo.location_lat)}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <Requests info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    
    return(
      <div>
        <div className ="jumbotron jumbotron-fluid text-center">
          <h1 className ="display-4">Map, get involved now!</h1>
          <div className ="offset-2">
            <h4 className ="text-left lead mt-3">Hello {this.props.user.email} </h4>
          </div>
        </div>

        <div className ="container">
          <div className ="lead">
            <p className ="text-center">
              Browse the map below and take a good look around! Respond if it is something that
              interest you.
            </p>
            <p className ="text-center">
              The markers are request or post made by someone in your community<br/>
              Red for <span style ={{color: 'red'}}>Material-Need</span> and Blue
              for <span style ={{color: 'blue'}}>One-Time Task</span>
            </p>
          </div>          
          <div className ="offset-md-1">
            <ReactMapGL
              {...this.state.viewport}
                width="70vw"
                height="60vh"
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={viewport => this.setState({viewport})}
                mapboxApiAccessToken={TOKEN}
                onClick ={this.onClickMap}
                onDblClick ={this.onDblClick}
                doubleClickZoom ={false}
              >
              {this.state.helps.map(help => (
                <MapPin 
                  {...this.state.helps}
                  key={help.id}
                  data={this.state.helps} 
                  onClick={this._onClickMarker}
                />
              ))
              }
              {this._renderPopup()}          
            </ReactMapGL>
          </div>

          <div className ="pb-5 text-center">
            <p className ="text-center pt-3 lead">
              Make your own post to help others or ask for help
            </p>
            <Link 
              to ='/post'
              className =''
              role ='button'
            >
              <button className ="btn btn-outline-primary">
                Click here to volunteer
              </button>
            </Link>
          </div> 
        </div>
      </div>
    );
  };
};

export default Map;

