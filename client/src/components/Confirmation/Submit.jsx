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
      alreadySelectedPlayer: false,
      maxPlayersReached: false,
      scoreNotEven: false,
      dropDownSelectPlayer: 'select player',
      dropDownSelectScore: 'result',
      dropDownSelectUserScore: 'result',
      displayUserScoreDropdown: true,
      selectedGame: {},
      selectedGameId: null,
      noPlayerSelected: false,
      confirmationSubmitted: false,
    }
  }

  componentDidMount () {
    axios
      .get('/api/game/fetch')
      .then(({ data }) => this.setState({ games: data }))
      .catch(err => console.log(err))
  }

  addPlayer = () => {
    let { userId, username, score, totalScore, playerHist, noPlayerSelected } = this.state;

    if (userId === null || score === null) {
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

    console.log(games[id])
    this.setState({ selectedGame: games[id], selectedGameId: id })
    //setState to render title and image, also setstate id to be sent if submitted
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
          this.setState({ confirmationSubmitted: true })
          setTimeout( () => this.setState({ confirmationSubmitted: false }), 5000)
          this.clearAll();
        })
        .catch(err => console.log(err))

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
      games,
      noPlayerSelected,
      maxPlayersReached, 
      totalScore, 
      scoreNotEven, 
      dropDownSelectPlayer, 
      dropDownSelectScore,
      displayUserScoreDropdown,
      selectedGame,
      confirmationSubmitted } = this.state;

    return (
      <div className="submitForm">
        <button onClick={this.showState}>showState</button>
        <div>
          {confirmationSubmitted && <div>Score Submitted</div>}

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