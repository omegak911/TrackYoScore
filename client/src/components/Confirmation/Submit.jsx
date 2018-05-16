import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Submit.scss';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      username: '',
      score: 0,
      totalPlayers: [],
      playerHist: {},
      alreadySelectedPlayer: false,
      maxPlayersReached: false,
    }
  }

  addPlayer = () => {
    let { userId, username, score, totalPlayers, playerHist } = this.state;

    if (playerHist[username]) {
      this.setState({ alreadySelectedPlayer: true });
      setTimeout(() => this.setState({ alreadySelectedPlayer: false}), 5000);
    } else if (totalPlayers.length <= 5) {
      let totalCopy = totalPlayers.slice();
      totalCopy.push({ userId, username, score });
      playerHist[username] = true;
      this.setState({ playerHist, totalPlayers: totalCopy, userId: 0, username: '', score: 0 });
    } else {
      this.setState({ maxPlayersReached: true });
    }
  }

  selectPlayer = (e) => {
    let userId = Number(e.target.value);
    const { friends } = this.props;
    let username = '';

    for (var i = 0; i < friends.length; i++) {
      if (friends[i].id === userId) {
        username = friends[i].username;
      }
    }

    this.setState({ userId, username });
  }

  selectScore = (e) => {
    let score = e.target.value === 'Win' ? 10 : 5;

    this.setState({ score })
  }

  render() {
    const { friends } = this.props;
    let { alreadySelectedPlayer, maxPlayersReached, totalPlayers } = this.state;

    return (
      <div className="submitForm">
        <div>
          {totalPlayers.map(player =>
            <div key={player.userId}>
              {player.username}
              {player.score === 10 ? 'Win' : 'Loss'}
            </div>
          )}
        
          <select name="player" onChange={this.selectPlayer}>
            <option value="select">select player</option>
            {friends.map((user, index) =>
              <option key={index} value={user.id}>
                {user.username}
              </option>
            )}
          </select>
          <select name="" id="" onChange={this.selectScore}>
            <option value="result">result</option>
            <option value="win">Win</option>  
            <option value="loss">Loss</option>
          </select>

        </div>

        {alreadySelectedPlayer && <div>Player has already been added</div>}
        {maxPlayersReached && <div>You have reached the maximum number of players</div>}
        <button type="button" onClick={this.addPlayer}>Add Score</button>
            
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    friends: state.friends
  }
}

export default connect(mapStateToProps)(Submit);