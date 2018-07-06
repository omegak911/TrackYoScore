import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import GameDisplay from '../GameDisplay/GameDisplay';
import './Submit.scss';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // games: {},
      totalScore: {},
      playerHist: {},
      selectedGame: {},
      selectedGameId: null,
      userId: null,
      username: '',
      score: null,
      dropDownSelectPlayer: 'select player',
      dropDownSelectScore: 'result',
      dropDownSelectUserScore: 'result',
      displayUserScoreDropdown: true,
      message: '',
      showGameModal: false,
    }
  }

  findGame = () => {
    this.setState({ showGameModal: !this.state.showGameModal })
  }

  selectUserScore = async (e) => {
    const { id, username } = this.props.userData;
    let score = e.target.value === 'win' ? 10 : 5;
    await this.setState({ userId: id, username, score, dropDownSelectUserScore: e.target.value, displayUserScoreDropdown: false });
    await this.addPlayer();
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

  addPlayer = () => {
    let { userId, username, score, totalScore, playerHist, message } = this.state;

    if (userId === null || score === null) {
      this.setState({ message: 'Please enter player and score' })
      this.restoreMessage();
    } else if (playerHist[username]) {
      this.setState({ message: 'Player has already been added' });
      this.restoreMessage();
    } else if (Object.keys(totalScore).length <= 5) {
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
      this.setState({ message: 'You have entered the maximum number of players' });
      this.restoreMessage();
    }
  }

  submitConfirmation = () => {
    const { totalScore, selectedGameId } = this.state;  // let's refactor this to selectedGame.id
    let wins = 0;
    let loss = 0;
    
    for (let key in totalScore) {
      if (totalScore[key].score === 10) {
        wins += 1;
      } else {
        loss += 1;
      }
    }

    if (wins === loss) {
      axios
        .post('/api/history/confirmation', { playerScore: totalScore, gameId: selectedGameId }) //affects this too
        .then(({ data }) => {
          this.setState({ message: 'Score Submitted' })
          this.restoreMessage();
          this.clearAll();
        })
        .catch(err => console.log(err))

    } else {
      this.setState({ message: 'scores are not even, please resubmit' });
      this.restoreMessage();
    }
  }

  restoreMessage = () => {
    setTimeout(()=> this.setState({ message: '' }), 5000);
  }

  clearAll = () => {
    this.setState({
      totalScore: {},
      playerHist: {},
      selectedGame: {},
      selectedGameId: null,
      userId: null,
      username: '',
      score: null,
      dropDownSelectPlayer: 'select player',
      dropDownSelectScore: 'result',
      dropDownSelectUserScore: 'result',
      displayUserScoreDropdown: true })
  }

  render() {
    const { friends } = this.props;
    let { games } = this.props;
    let { 
      showGameModal,
      totalScore, 
      dropDownSelectPlayer, 
      dropDownSelectScore,
      displayUserScoreDropdown,
      selectedGame,
      message } = this.state;

    return (
      <div className="submitForm">
        {showGameModal &&
          <GameDisplay />}
        <h2>Submit A New Challenge Score</h2>

        <div className="submitGrid">
          <div className="gridGameColumn">
            Game Title
          </div>
          <div className="gridPlayerNameColumn">
            <div className="innerPlayerName"><span>Player Name</span></div>
          </div>
          <div className="gridScoreColumn">
            Result
          </div>
          <div className="gridGameImage">
            {selectedGame.title && 
              <div className="selectedGame">
                <img src={selectedGame.image} alt="game image"/>
                <div>{selectedGame.title}</div>
              </div>
            }
          </div>
          
          <div className="gridPlayerName">
            {Object.keys(totalScore).map(userId =>
              <div key={userId}>
                <div className="innerPlayerName"><span>{totalScore[userId].username}</span></div>
              </div>
            )}
          </div>
          <div className="gridScore">
            {Object.keys(totalScore).map(userId =>
              <div key={userId}>
                {totalScore[userId].score === 10 ? 'Win' : 'Loss'}
              </div>
            )}
          </div>

          <div className="gridGameSelect">
            <button className="gameChoices" onClick={this.findGame}>
              Choose Game
            </button>
          </div>
          <div className="gridPlayerSelect">
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
                <button type="button" onClick={this.addPlayer}>Add Score</button>
              </div>}
          </div>

          <div className="gridSubmit">
            <div className="errorMsg">{message}</div>
            <button onClick={this.submitConfirmation}>Submit Result</button>
            <button onClick={this.clearAll}>Clear All</button>
          </div>
        </div>            
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    friends: state.friends,
    userData: state.userData,
    selectedGame: state.selectedGame,
  }
}

export default connect(mapStateToProps)(Submit);