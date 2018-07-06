import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectGame } from '../../../redux/actions';
import axios from 'axios';

class GameDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      filteredGames: [],
      filter: '',
    }
  }

  componentDidMount() {
    axios
      .get('/api/game/fetch')
      .then(({ data }) => {
        console.log(data)
        this.setState({ games: data })
      })
      .catch(err => console.error(err))
  }

  filterGames = (e) => {
    e.preventDefault();
    console.log('activating filter')
    let { games, filter } = this.state;

    let filteredGames = games.filter(game => game.title.includes(filter))

    this.setState({ filteredGames })
  }

  handleChange = (e) => {
    let filter = e.target.value;
    this.setState({ filter });
  }

  render() {
    let { filteredGames, filter } = this.state;

    return (
      <div>
        <div className="gameSearchFilter">
          <form onSubmit={e => this.filterGames(e)}>
            <input placeholder="filter titles here" value={filter} onChange={this.handleChange}/>
          </form>
        </div>
        <div className="gameList">
        {filteredGames.map((game, index) => 
          <div key={index} onClick={() => this.props.selectGame(game)}>
            {game.title}
          </div>
        )}
        </div>
      </div>
    )
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ selectGame }, dispatch)
}

export default connect(null, matchDispatchToProps)(GameDisplay);