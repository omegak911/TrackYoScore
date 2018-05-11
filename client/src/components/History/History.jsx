import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './History.scss';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeHist: [],
    }
  }

  componentDidMount() {
    const { id } = this.props.userData;
    console.log('history user id: ', id);

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

  render() {
    let { challengeHist } = this.state;

    return (
      <div>
        Hello from history
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