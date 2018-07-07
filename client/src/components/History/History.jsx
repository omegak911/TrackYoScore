import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

import HistoryConfirmation from './HistoryConfirmation';
import { CLOUD_NAME } from '../../../../config';
import './History.scss';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeHist: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.props.userData) {
      this.props.history.push('/');
      } else {
      let { id } = this.props.userData;
      let options = {
        params: {
          id,
        }
      }
  
      axios
        .get('/api/history/history', options)
        .then(({ data }) => {
          this.setState({ challengeHist: data })
        })
        .catch(err => console.log(err));
    }
    }, 100);
  }

  render() {
    let { challengeHist } = this.state;

    return (
      <div>
        <HistoryConfirmation />
          <div className="matchesTopContainer">
            {challengeHist.map((match, index) => 
              <div key={index}>
              <div className="match">
                <div className="matchGame">
                  <Image cloudName={CLOUD_NAME} publicId={`TrackYoScoreGamePics/${match.history.game.image}`} >
                    <Transformation aspectRatio="1:1" background="#262c35" border="5px_solid_rgb:FFFFFF" gravity="auto" radius="max" crop="fill" />
                  </Image>
                  <div className="columnTitle">{match.history.game.title}</div>
                </div>
                <div className="matchScores">
                  <div className="confirmationStats">
                    <div className="confirmationPlayerName">
                      <span className="columnTitle">Player</span>
                    </div>
                    <div className="confirmationScore">
                      <span className="confirmationsPlayerscore columnTitle">Result</span>
                    </div>
                  </div>
                  <div>
                    {Object.keys(match.history.playerScore).map((user, i) => 
                      <div className="confirmationStats" key={i}>
                        <div className="confirmationPlayerName">
                          <span>{match.history.playerScore[user].username}</span> 
                        </div>
                        <div className="confirmationScore">
                          <span className="confirmationsPlayerscore">{match.history.playerScore[user].score === 10 ? 'Win' : 'Loss'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </div>
            )}
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps)(History);