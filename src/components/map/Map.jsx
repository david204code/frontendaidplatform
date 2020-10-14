import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = 'pk.eyJ1IjoiZGF2aWQyMDRjb2RlMSIsImEiOiJjazc2YjdobGUwOTI0M2VvamwwZXpvZGR1In0.FSpShMuhbroEHA9-0iG4sg';

class Map extends React.Component {

  _isMounted =false;

  constructor(props) {
    super(props);

    this.state = {

      viewport: {
        longitude: -0.140,
        latitude: 51.508,
        zoom: 14,
        bearing: 0,
        pitch: 0
      },
      
    };


  };

  render() {
    
    return(
      <div>
        <div className ="jumbotron jumbotron-fluid text-center">
          <h1>Map, get involved now!</h1>
          <div className ="offset-2">
            <h4 className ="text-left">Hello {this.props.user.email} </h4>
          </div>
        </div>

        <div className ="container">
          <div className ="">
            <p className ="text-center">
              Browse the map below and take a good look around! Respond if it is something that
              interest you.
            </p>
            <p className ="text-center">
              The markers are request or post made by someone in your community
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
            </ReactMapGL>
          </div>

          <div className ="pb-5 text-center">
            <p className ="text-center pt-3">
              Make your own post to help others or ask for help
            </p>
            <Link 
              to ='/post'
              className =''
              role ='button'
            >
              <button>
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

