import React, { Component } from 'react';
import axios from 'axios';

import SubmitScore from './Submit/Submit';
import './Home.scss';

const Home = () =>
    <div 
      className="homeTopContainer"
      style={{ backgroundImage: `url('https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-654391.jpg')`}}>
      <div className="homeMidContainer">
        <div className="homeInnerContainer">
          <SubmitScore />
        </div>
      </div>
    </div>

export default Home;