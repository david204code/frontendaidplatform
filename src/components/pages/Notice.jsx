import React from 'react';
import { Link } from 'react-router-dom';

class Notice extends React.Component {

  render() {
    return (
      <div>
        <h2 className ="text-center pt-4 pb-3">You need to sign in to view this page</h2>
        <p className ="text-center">
          <Link
            to ="/"
          >
            <button>
              Click here 
            </button>
            </Link> to return to the homepage
        </p>
      </div>
    );
  };
};

export default Notice;