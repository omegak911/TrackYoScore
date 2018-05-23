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
      totalScore: {},
      playerHist: {},
      alreadySelectedPlayer: false,
      maxPlayersReached: false,
      scoreNotEven: false,
      dropDownSelectPlayer: 'select player',
      dropDownSelectScore: 'result',
      dropDownSelectUserScore: 'result',
      displayUserScoreDropdown: true,
      noPlayerSelected: false,
    }
  }

  addPlayer = () => {
    let { userId, username, score, totalScore, playerHist, noPlayerSelected } = this.state;

    if (userId === null) {
      this.setState({ noPlayerSelected: true});
      setTimeout(()=> this.setState({ noPlayerSelected: false }), 5000);
    } else if (playerHist[username]) {
      this.setState({ alreadySelectedPlayer: true });
      setTimeout(() => this.setState({ alreadySelectedPlayer: false}), 5000);
    } else if (Object.keys(totalScore).length <= 5) {
      // let totalCopy = totalScore.slice();
      totalScore[userId] = { username, score };
      playerHist[username] = true;
      this.setState({ 
        playerHist, 
        totalScore, 
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
    this.setState({ totalScore: [], playerHist: {}, dropDownSelectPlayer: "select player", dropDownSelectScore: "result" })
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
  }

  selectScore = (e) => {
    let score = e.target.value === 'win' ? 10 : 5;
    this.setState({ score, dropDownSelectScore: e.target.value })
  }

  selectUserScore = async (e) => {
    const { id, username } = this.props.userData;
    let score = e.target.value === 'win' ? 10 : 5;
    console.log(`id: ${id}, username: ${username}, score: ${e.target.value}`)
    await this.setState({ userId: id, username, score, dropDownSelectUserScore: e.target.value, displayUserScoreDropdown: false });
    await this.addPlayer();
  }

  submitConfirmation = () => {
    const { totalScore } = this.state;
    
    let wins = 0;
    let loss = 0;
    for (let i = 0; i < totalScore.length; i++) {
      if (totalScore[i].score === 10) {
        wins += 1;
      } else {
        loss += 1;
      }
    }

    if (wins === loss) {
      //send axios request
      //provide confirmation message
      //invoke clear all
    } else {
      this.setState({ scoreNotEven: true });
      setTimeout(() => this.setState({ scoreNotEven: false }), 5000);
    }
  }

  showState = () => {
    console.log(this.state)
  }

  render() {
    const { friends } = this.props;
    let { 
      alreadySelectedPlayer, 
      noPlayerSelected,
      maxPlayersReached, 
      totalScore, 
      scoreNotEven, 
      dropDownSelectPlayer, 
      dropDownSelectScore,
      displayUserScoreDropdown } = this.state;

    return (
      <div className="submitForm">
        <button onClick={this.showState}>showState</button>
        <div>
          {Object.keys(totalScore).map(userId =>
            <div key={userId}>
              {totalScore[userId].username + ' - '}
              {totalScore[userId].score === 10 ? 'Win' : 'Loss'}
            </div>
          )}

          {displayUserScoreDropdown &&
            <div>
              Your Score 
              <select name="" id="" onChange={this.selectUserScore} value={dropDownSelectScore}>
                <option value="result">result</option>
                <option value="win">Win</option>  
                <option value="loss">Loss</option>
              </select>
            </div>}
        
          {!displayUserScoreDropdown && 
            <div>
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
            </div>}
        </div>

        {alreadySelectedPlayer && <div>Player has already been added</div>}
        {maxPlayersReached && <div>You have reached the maximum number of players</div>}
        {noPlayerSelected && <div>Please enter player and score</div>}
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
    friends: state.friends,
    userData: state.userData
  }
}

export default connect(mapStateToProps)(Submit);