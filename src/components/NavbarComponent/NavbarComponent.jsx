import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TimeZoneFormComponent from '../TimeZoneFormComponent/TimeZoneFormComponent';
import TimeZonePreviewComponent from '../TimeZonePreviewComponent/TimeZonePreviewComponent';

const NavbarComponent = () => {

  return (
    <Router>
          <Routes>
            <Route exact path="/" element={<TimeZoneFormComponent />} />
            <Route path="/preview" element={<TimeZonePreviewComponent />} />
          </Routes>
    </Router>
  );
};

export default NavbarComponent;
