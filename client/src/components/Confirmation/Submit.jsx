import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Submit.scss';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: {},
      userId: null,
      username: '',
      score: null,
      totalScore: {},
      playerHist: {},
      dropDownSelectPlayer: 'select player',
      dropDownSelectScore: 'result',
      dropDownSelectUserScore: 'result',
      displayUserScoreDropdown: true,
      selectedGame: {},
      selectedGameId: null,
      message: '',
    }
  }

  componentDidMount () {
    axios
      .get('/api/game/fetch')
      .then(({ data }) => this.setState({ games: data }))
      .catch(err => console.log(err))
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

  restoreMessage = () => {
    setTimeout(()=> this.setState({ message: '' }), 5000);
  }

  clearAll = () => {
    this.setState({
      userId: null,
      username: '',
      score: null,
      totalScore: [], 
      playerHist: {}, 
      dropDownSelectPlayer: "select player", 
      dropDownSelectScore: "result",
      dropDownSelectUserScore: 'result',
      displayUserScoreDropdown: true,
      selectedGame: {},
      selectedGameId: null })
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

  selectGame = (e) => {
    let { games } = this.state;
    let id = e.target.value;
    this.setState({ selectedGame: games[id], selectedGameId: id })
  }

  selectScore = (e) => {
    let score = e.target.value === 'win' ? 10 : 5;
    this.setState({ score, dropDownSelectScore: e.target.value })
  }

  selectUserScore = async (e) => {
    const { id, username } = this.props.userData;
    let score = e.target.value === 'win' ? 10 : 5;
    await this.setState({ userId: id, username, score, dropDownSelectUserScore: e.target.value, displayUserScoreDropdown: false });
    await this.addPlayer();
  }

  submitConfirmation = () => {
    const { totalScore, selectedGameId } = this.state;
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
        .post('/api/history/confirmation', { playerScore: totalScore, gameId: selectedGameId })
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

  render() {
    const { friends } = this.props;
    let { 
      games,
      totalScore, 
      dropDownSelectPlayer, 
      dropDownSelectScore,
      displayUserScoreDropdown,
      selectedGame,
      message } = this.state;

    return (
      <div className="submitForm">
        <h2>Submit A New Challenge Score</h2>
        <div>
          {selectedGame.title && 
            <div>
              <img src={selectedGame.image} alt="game image"/>
              <div>{selectedGame.title}</div>
            </div>
          }

          {Object.keys(totalScore).map(userId =>
            <div key={userId}>
              {totalScore[userId].username + ' - '}
              {totalScore[userId].score === 10 ? 'Win' : 'Loss'}
            </div>
          )}

          <select name="" id="" onChange={this.selectGame} value={dropDownSelectScore}>
            <option value="result">Game</option>
            {Object.keys(games).map(id =>
              <option key={id} value={id}>{games[id].title}</option>
            )}
          </select>

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

        <div>{message}</div>
        <button type="button" onClick={this.addPlayer}>Add Score</button>
        <br/>
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