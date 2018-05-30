import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import History from './History/History';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import UserSearchResults  from './Search/UserSearchResult';

class ProtectedRoutes extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout( () => {
      if (!this.props.userData) {
        this.props.history.push('/');
      } else {
        console.log('welcome back')
      }
    }, 100)
  }

  render() {
    const { match } = this.props;

    return (
      <div>
        <Route path={match.url + '/history'} component={History} />
        <Route path={match.url + '/home'} component={Home} />
        <Route path={match.url + '/profile'} component={Profile} />
        <Route path={match.url + '/userSearchResults'} component={UserSearchResults} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps)(ProtectedRoutes);