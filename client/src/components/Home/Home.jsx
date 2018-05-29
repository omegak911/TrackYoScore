import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubmitScore from '../Confirmation/Submit';
import Search from '../Search/Search';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <SubmitScore />
        <br/>
        find new friends
        <Search history={this.props.history}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps)(Home);