import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Requests extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.title}, ${info.description}`;
    return (
      <div>
        <div>
          {/* {displayName} |{' David '} */}
          <h3>{info.title}</h3>
          <p>{info.description}</p>
          <p>{info.request_type}</p>
          <Link to={`/request/${info.id}`} className="">
            View request
          </Link>
        </div>
        <img width={240} src={info.image} />
      </div>
    );
  }
}

export default Requests;