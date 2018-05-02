import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from '../Search/Search';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  showTreasure = () => {
    console.log(this.state);
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.showTreasure}>**********</button>
        submit new scores here
        <Search />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user_data: state.user_data,
  }
}

export default connect(mapStateToProps)(Home);