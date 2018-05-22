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

  componentDidMount() {
    setTimeout(() => {
      if (!this.props.userData) {
      this.props.history.push('/');
    }}, 100);
  }

  showTreasure = () => {
    console.log(this.state);
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.showTreasure}>**********</button>
        submit score
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