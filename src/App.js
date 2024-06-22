import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Form1 from './forms/Form1';
import Form2 from './forms/Form2';
import Form3 from './forms/Form3';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/form1" element={<Form1/>} />
          <Route path="/form2" element={<Form2/>} />
          <Route path="/form3" element={<Form3/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
