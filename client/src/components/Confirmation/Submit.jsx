import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Submit.scss';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: '',
      player1Score: 0,
      player2: '',
      player2Score: 0,
      player3: '',
      player3Score: 0,
      player4: '',
      player4Score: 0,
      player5: '',
      player5Score: 0,
      player6: '',
      player6Score: 0,
      totalPlayers: [1,1],
      maxPlayersReached: false,
    }
  }

  morePlayers = () => {
    let totalCopy = this.state.totalPlayers.slice();
    if (totalCopy.length <= 5) {
      totalCopy.push(1);
      this.setState({ totalPlayers: totalCopy });
    } else {
      this.setState({ maxPlayersReached: true });
    }
  }

  queryFriend = (e) => {
    let query = e.target.value;

    console.log(query);
    console.log(this.props.friends);
  }

  render() {
    const { friends } = this.props;
    let { maxPlayersReached, totalPlayers } = this.state;

    return (
      <div className="submitForm">
        <form action="">
        
        {totalPlayers.map( (player, index) => 
          <div key={index}>
            <select name="player">
              <option value="select">select player</option>
              {friends.map((user, index) =>
                <option key={index} value={user.username}>
                  {user.username}
                </option>
              )}
            </select>
            <select name="" id="">
              <option value="result">result</option>
              <option value="win">Win</option>  
              <option value="loss">Loss</option>
            </select>
          </div>
        )}
        <input type="text" onChange={e => this.queryFriend(e)} />

        {maxPlayersReached && <div>You have reached the maximum number of players</div>}
        <button type="button" onClick={this.morePlayers}>More Players</button>

        </form>
            
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