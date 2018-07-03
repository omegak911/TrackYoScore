import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import axios from 'axios';

import { TO_THE_CLOUD, GAME_PRESET_NAME, CLOUD_URL } from '../../../../config';

class AddGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gamePhoto: null,
      gameTitle: '',
    }
  }

  addGame = (e) => {
    e.preventDefault();
    const { gamePhoto, gameTitle } = this.state;

    if (gamePhoto !== null && gameTitle.length > 0) {
      axios
        .post(CLOUD_URL, gamePhoto, {headers: { "X-Requested-With": "XMLHttpRequest" }})
        .then(({ data }) => {
          //on success, send axios put request
          const url = data.secure_url;
          const urlArr = url.split('/');
          const photoName = urlArr[urlArr.length - 1].split('.')[0];
          console.log('created: ', photoName);
          console.log('urlArr: ', urlArr);
          axios
            .post('/api/game/add', { title: gameTitle, image: photoName })
            .then(({ data }) => console.log('put data: ', data))
            .catch(err => console.log(err));

          this.setState({ gamePhoto: null, gameTitle: '' })
        })
      .catch(err => console.log(err));
    }
  }

  handleDrop = (file) => {
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append("upload_preset", GAME_PRESET_NAME);
    formData.append("api_key", TO_THE_CLOUD);
    formData.append("timestamp", (Date.now() / 1000) | 0);
    this.setState({ gamePhoto: formData })
  }

  updateGameTitle = (e) => {
    let gameTitle = e.target.value;
    this.setState({ gameTitle })
  }

  render() {
    let { gamePhoto, gameTitle } = this.state;

    return (
      <div>
        {gamePhoto ? 
        <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, width: 200 }}>
          <p>Ready for upload</p>
        </div>
        :
        <Dropzone
          onDrop={this.handleDrop}
          multiple={false}            //let's check what this means
          accept="image/*"
          // maxSize={1000000}
          // style={}
          >
          <p>Upload image here</p>
        </Dropzone>}
        <form onChange={this.updateGameTitle} onSubmit={e => this.addGame(e)} >
          <input placeholder="game title" value={gameTitle}/>
          <button onClick={this.addGame} >Add Game</button>
        </form>
      </div>
    )
  }
}

export default AddGame;