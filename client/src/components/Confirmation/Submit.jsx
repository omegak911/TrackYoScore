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
      maxPlayersReached: false,
    }
  }

  morePlayers = () => {
    // let totalCopy = this.state.totalPlayers.slice();
    // if (totalCopy.length <= 5) {
    //   totalCopy.push(1);
    //   this.setState({ totalPlayers: totalCopy });
    // } else {
    //   this.setState({ maxPlayersReached: true });
    // }
    console.log(this.state);
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
    let { maxPlayersReached, totalPlayers } = this.state;

    return (
      <div className="submitForm">
        <div>
        
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

        {maxPlayersReached && <div>You have reached the maximum number of players</div>}
        <button type="button" onClick={this.morePlayers}>Add Score</button>
            
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