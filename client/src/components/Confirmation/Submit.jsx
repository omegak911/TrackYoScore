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
    }
  }

  morePlayers = () => {
    let totalCopy = this.state.totalPlayers.slice();
    totalCopy.push(1);
    this.setState({ totalPlayers: totalCopy })
  }

  queryFriend = (e) => {
    let query = e.target.value;

    console.log(query);
    console.log(this.props.friends);
  }

  render() {
    const { friends } = this.props;
    let { totalPlayers } = this.state;

    return (
      <div className="submitForm">
        <form action="">
        
        {totalPlayers.map( (player, index) => 
          <select name="player" key={index}>
            {friends.map((user, index) =>
              <option key={index} value="">
                {user.username}
              </option>
            )}
          </select>
        )}
        <input type="text" onChange={e => this.queryFriend(e)} />
        <button type="button" onClick={this.morePlayers}>More Player</button>
        
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