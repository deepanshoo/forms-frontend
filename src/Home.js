import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="heading">Home Page</div>
      <div>
          <div><Link to="/form1">Go to Level 1</Link></div>
          <div><Link to="/form2">Go to Level 2</Link></div>
          <div><Link to="/form3">Go to Level 3</Link></div>
      </div>
    </div>
  );
};

export default Home;
