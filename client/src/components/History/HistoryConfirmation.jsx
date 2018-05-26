import React, { Component } from 'react';
import axios from 'axios';

class HistoryConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      histConfirmationsPending: [],
      confirmationModal: false,
    }
  }

  componentDidMount() {
    axios
      .get('api/history/confirmation')
      .then(({ data }) => this.setState({ histConfirmationsPending: data }))
      .catch(err => console.log(err))
  }

  showPendingConfirmations = () => {
    this.setState({ confirmationModal: !this.state.confirmationModal })
    console.log(this.state.histConfirmationsPending)
  }

  stopPropagation = (e) => {
    e.stopPropagation();
  }

  validateConfirmation = (index) => {
    const { id } = this.state.histConfirmationsPending[index].confirmation;
    axios
      .put('/api/history/confirmation', { id })
      // then remove confirmation from index and setState
      .then(() => {
        let { histConfirmationsPending } = this.state;
        let temp = histConfirmationsPending.slice();
        temp.splice(index, 1);
        this.setState({ histConfirmationsPending: temp });
        console.log('done')
      
      })
      .catch(err => console.log(err))
  }

  render() {
    let { confirmationModal, histConfirmationsPending } = this.state;

    return (
      <div>
        {confirmationModal &&
          <div className="modal">
            <div className="veilOfDarkness" onClick={this.showPendingConfirmations}>
              <div className="confirmationsOuterContainer" onClick={this.stopPropagation}>
                <div className="confirmationsInnerContainer">
                {histConfirmationsPending.map((match, index) => 
                  <div key={index} className="match">
                    <div className="matchGame">
                      <img className="gameImage" src={match.confirmation.game.image} />
                      <div>{match.confirmation.game.title}</div>
                    </div>
                    <div className="matchScores">
                      <div className="confirmationStats">
                        <div className="confirmationPlayerName">
                          <span>Player</span>
                        </div>
 
                        {' '}
                        <div className="confirmationScore">
                          <span className="confirmationsPlayerscore">Result</span>
                        </div>
                      </div>
                      <div className="historyResultScores">
                        {Object.keys(match.confirmation.playerScore).map((user, i) => 
                          <div className="confirmationStats" key={i}>
                            <div className="confirmationPlayerName">
                              <span>{match.confirmation.playerScore[user].username}</span> 
                            </div>
                            <div className="confirmationScore">
                              <span className="confirmationsPlayerscore">{match.confirmation.playerScore[user].score === 10 ? 'Win' : 'Loss'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <button type="button" onClick={() => this.validateConfirmation(index)}>validate</button>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        }
        <button type="button" onClick={this.showPendingConfirmations}>
          Confirm Your Scores
        </button>
      </div>
    )
  }
}

export default HistoryConfirmation;