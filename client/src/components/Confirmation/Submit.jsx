import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Submit.scss';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      username: '',
      score: null,
      totalPlayers: [],
      playerHist: {},
      alreadySelectedPlayer: false,
      maxPlayersReached: false,
      scoreNotEven: false,
      dropDownSelectPlayer: "select player",
      dropDownSelectScore: "result"
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
      this.setState({ 
        playerHist, 
        totalPlayers: totalCopy, 
        userId: null, 
        username: '', 
        score: null,
        dropDownSelectPlayer: "select player", 
        dropDownSelectScore: "result" });
    } else {
      this.setState({ maxPlayersReached: true });
    }
  }

  clearAll = () => {
    this.setState({ totalPlayers: [], playerHist: {}, dropDownSelectPlayer: "select player", dropDownSelectScore: "result" })
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
    this.setState({ userId, username, dropDownSelectPlayer: userId });
    console.log('reached selectPlayer function')
  }

  selectScore = (e) => {
    let score = e.target.value === 'win' ? 10 : 5;
    this.setState({ score, dropDownSelectScore: e.target.value })
  }

  submitConfirmation = () => {
    const { totalPlayers } = this.state;
    
    let wins = 0;
    let loss = 0;
    for (let i = 0; i < totalPlayers.length; i++) {
      if (totalPlayers[i].score === 10) {
        wins += 1;
      } else {
        loss += 1;
      }
    }

    if (wins === loss) {

    } else {
      this.setState({ scoreNotEven: true });
      setTimeout(() => this.setState({ scoreNotEven: false }));
    }
    
  }


  showState = () => {
    console.log(this.state)
  }

  render() {
    const { friends } = this.props;
    let { 
      alreadySelectedPlayer, 
      maxPlayersReached, 
      totalPlayers, 
      scoreNotEven, 
      dropDownSelectPlayer, 
      dropDownSelectScore } = this.state;

    return (
      <div className="submitForm">
        <button onClick={this.showState}>showState</button>
        <div>
          {totalPlayers.map(player =>
            <div key={player.userId}>
              {player.username + ' - '}
              {player.score === 10 ? 'Win' : 'Loss'}
            </div>
          )}
        
          <select name="player" onChange={this.selectPlayer} value={dropDownSelectPlayer}>
            <option value="select player">select player</option>
            {friends.map((user, index) =>
              <option key={index} value={user.id}>
                {user.username}
              </option>
            )}
          </select>
          <select name="" id="" onChange={this.selectScore} value={dropDownSelectScore}>
            <option value="result">result</option>
            <option value="win">Win</option>  
            <option value="loss">Loss</option>
          </select>

        </div>

        {alreadySelectedPlayer && <div>Player has already been added</div>}
        {maxPlayersReached && <div>You have reached the maximum number of players</div>}
        <button type="button" onClick={this.addPlayer}>Add Score</button>
        <br/>
        {scoreNotEven && <div>scores are not even, please resubmit</div>}
        <button onClick={this.submitConfirmation}>Submit Result</button>

        <br/>
        <button onClick={this.clearAll}>Clear All</button>
            
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