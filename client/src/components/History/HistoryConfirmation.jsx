import React, { Component } from 'react';
import axios from 'axios';

class HistoryConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      histConfirmationsPending: [],
    }
  }

  componentDidMount() {
    axios
      .get('api/history/confirmation')
      .then(({data})=>console.log(data))
      // .then(({ data }) => this.setState({ histConfirmationsPending: data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        display rows of history confirmations here and send axios request to confirm with id
        {/* {histConfirmationsPending.map((confirmation, index) => 
          <div key={index} index={index}>
          
          </div>
        
        )} */}
      </div>
    )
  }
}

export default HistoryConfirmation;