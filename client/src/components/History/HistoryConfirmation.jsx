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
  }

  stopPropagation = (e) => {
    e.stopPropagation();
  }

  render() {
    let { confirmationModal } = this.state;

    return (
      <div>
        {confirmationModal &&
          <div className="modal">
            <div className="veilOfDarkness" onClick={this.showPendingConfirmations}>
              <div className="confirmationsPending" onClick={this.stopPropagation}>

                display rows of history confirmations here and send axios request to confirm with id
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