import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import History from './History/History';
import Home from './Home/Home';
import Landing from './Landing/Landing';
import Nav from './Nav/Nav';
import Profile from './Profile/Profile';
import UserSearchResults  from './Search/UserSearchResult';

import { updateUserData, updatePendingFriendRequests, updatePendingHistConfirmations, updateFriendList } from '../redux/actions'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    }
  }

  componentDidMount() {
    const { updateUserData, updatePendingFriendRequests, updatePendingHistConfirmations, updateFriendList } = this.props;

    axios
      .get('/api/auth/isLoggedIn')
      .then(({ data }) => {
        console.log('App CDM success')
        console.log(data)
        if (data.username) {
          updateUserData(data);
          updateFriendList(data.friendsList);
          updatePendingFriendRequests(data.friendRequests);
          updatePendingHistConfirmations(data.confirmationNeeded);
        } else if (window.location.pathname !== '/') {
          this.setState({ redirect: true });
        }
      })
      .catch(err => {
        console.log('App CDM error')
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
            <div>
              <Nav />
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/history' component={History} />
                <Route path='/home' component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/userSearchResults' component={UserSearchResults} />
              </Switch>
              {this.state.redirect && <Redirect to="/" />}
            </div>
        </BrowserRouter>
      </div>
    );
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    updateUserData, 
    updatePendingFriendRequests, 
    updatePendingHistConfirmations, 
    updateFriendList
  }, dispatch)
}

export default connect(null, matchDispatchToProps)(App);