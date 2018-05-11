import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { id } = this.props.userData;
    console.log('history user id: ', id);

    let options = {
      params: {
        id,
      }
    }

    axios
      .get('/api/history/history', options)
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        Hello from history
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