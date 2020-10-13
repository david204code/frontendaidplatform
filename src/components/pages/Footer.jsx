import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends React.Component {

  constructor(props) {
    super(props);


  };

render() {

  return (
    <footer className="mt-auto text-center">
      <div className="">
        <p>My Footer</p>
      </div>
    </footer>
  )
}

};

export default Footer;