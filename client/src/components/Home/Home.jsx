import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SubmitScore from './Submit/Submit';
import Search from '../Search/Search';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      homeBackgroundUrl: null,
    }
  }

  render() {
    let { homeBackgroundUrl } = this.state;
    return (
      <div 
        className="homeTopContainer"
        style={{ backgroundImage: `url(${homeBackgroundUrl ? homeBackgroundUrl : 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-654391.jpg' })`}}>
        <div className="homeMidContainer">
          <div className="homeInnerContainer">
            <SubmitScore games={this.state.games} />
            <br/>
            find new friends
            <Search history={this.props.history}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps)(Home);