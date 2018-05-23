import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUserData, updatePendingFriendRequests, updatePendingHistConfirmations, updateFriendList } from '../../redux/actions'; 

import './Landing.scss';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      username: '',
      password: '',
      email: '',
      invalid: '',
    }
  }

  handleButton = (e) => {
    e.preventDefault();
    const type = e.target.name;
    type === "switch" ? this.switch() : type === 'login' ? this.login() : this.signup();
  }

  handleEntry = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  login = () => {
    const { username, password } = this.state;
    const options = {
      params: {
        username,
        password,
      }
    }

    axios
      .get('/api/auth/login', options)
      .then(({ data }) => {
        console.log('login data: ', data)
        this.handleData(data);
      })
      .catch(err => console.log(err));
  }

  signup = () => {
    const { email, username, password } = this.state;
    const options = {
      // email,
      username,
      password,
    }

    axios
      .post('/api/auth/signup', options)
      .then(({ data }) => {
        console.log('signup data: ', data)
        this.login();
      })
      .catch(err => console.log(err));
  }

  handleData = (data) => {
    const { updateUserData, updatePendingFriendRequests, updatePendingHistConfirmations, updateFriendList } = this.props;
    if (data.username) {
      updateUserData(data);
      updateFriendList(data.friendsList || []);
      updatePendingFriendRequests(data.friendRequests || []);
      updatePendingHistConfirmations(data.confirmationNeeded || []);
      this.props.history.push('/home');
    } else {
      this.setState({ invalid: data });
    }
  }

  switch = () => {
    this.setState({ login: !this.state.login });
  }

  render() {
    let { invalid, login } = this.state;

    return (
      <div>
        <div className="login">
          <form name={login ? "login" : "signup"} autoComplete="on" onSubmit={e => this.handleButton(e)}>
            <input type="text" name="username" placeholder="username" onChange={e => this.handleEntry(e)}/>
            <br/>
            {!login && 
              <div>
                <input type="text" name="email" placeholder="email" onChange={e => this.handleEntry(e)}/>
              </div>
            }
            <input type="password" name="password" placeholder="password" autoComplete="off" onChange={e => this.handleEntry(e)}/>
            <br/>
            {invalid.length > 0 &&
              <div>
                <span className="invalidLandingInput">{invalid}</span>
              </div>
            }
            <button>{login ? 'Login' : 'SignUp'}</button>
          </form>
          <button name="switch" type="button" onClick={e => this.handleButton(e)}>{login ? 'Go SignUp' : 'Go Login'}</button>
        </div>
      </div>
    )
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateUserData, updateFriendList, updatePendingHistConfirmations, updatePendingFriendRequests }, dispatch);
}

export default connect(null, matchDispatchToProps)(Landing);