import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './History.scss';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeHist: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.props.userData) {
      this.props.history.push('/');
      } else {
      let { id } = this.props.userData;
      let options = {
        params: {
          id,
        }
      }
  
      axios
        .get('/api/history/history', options)
        .then(({ data }) => this.setState({ challengeHist: data }))
        .catch(err => console.log(err));
    }
    }, 100);
  }

  render() {
    let { challengeHist } = this.state;

    return (
      <div>
        {challengeHist.map((match, index) =>
          <div key={index} className="historyResult">
            {match.playerScore.map((player, index) => 
              <span key={index} className="historyResultScores">{player.username} {player.score === 10 ? 'Win' : 'Lose'}</span>)}
          </div>)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps)(History);