import React, { Component } from 'react';
import axios from 'axios';

import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { CLOUD_NAME } from '../../../../../config';

import './GameDisplay.scss';

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
    this.setState({ games: this.props.games });
  }

  filterGames = (e) => {
    e.preventDefault();
    let { games, filter } = this.state;
    let lowerCaseFilter = filter.toLowerCase();
    let filteredGames = games.filter(game => game.title.toLowerCase().includes(lowerCaseFilter))
    this.setState({ filteredGames })
  }

  handleChange = (e) => {
    let filter = e.target.value;
    this.setState({ filter });
  }
  
  stopPropagation = (e) => {
    e.stopPropagation();
  } 

  render() {
    let { filteredGames, filter } = this.state;
    let { selectGame, toggleGameModal } = this.props;

    return (
      <div className="gameDisplayTopContainer" onClick={toggleGameModal}>
        <div className="gameDisplayFilter" onClick={e => this.stopPropagation(e)}>
          <div className="gameDisplayForm">
            <form onSubmit={e => this.filterGames(e)}>
              <input placeholder="filter titles here" value={filter} onChange={this.handleChange}/>
            </form>
          </div>
          <div className="gameDisplayList">
          {filteredGames.map((game, index) => 
            <div key={index} onClick={() => this.props.selectGame(game)}>
              <div className="gameDisplayListItem">
              <Image cloudName={CLOUD_NAME} publicId={`TrackYoScoreGamePics/${game.image}`} >
                <Transformation aspectRatio="1:1" background="#262c35" border="5px_solid_rgb:FFFFFF" gravity="auto" radius="max" crop="fill" />
              </Image>
              {game.title}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    )
  }
}

export default GameDisplay;