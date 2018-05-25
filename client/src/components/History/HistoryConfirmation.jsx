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
              <div className="confirmationsPending" onClick={this.stopPropagation}>
                {histConfirmationsPending.map((data, index) => 
                  <div key={index}>
                    {Object.keys(data.confirmation.playerScore).map((user, i) => 
                      <span className="historyResultScores" key={i}>
                        {data.confirmation.playerScore[user].username} {data.confirmation.playerScore[user].score === 10 ? 'Win' : 'Loss'}
                      </span>
                    )}
                    <button type="button" onClick={() => this.validateConfirmation(index)}>validate</button>
                  </div>
                )}
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