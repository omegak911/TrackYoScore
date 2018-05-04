import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { userData } from '../../redux/actions'; 

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      username: '',
      password: '',
      email: ''
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
      .get('/api/user/login', options)
      .then(({ data }) => {
        this.props.userData(data);
        this.props.history.push('/home');
      })
      .catch(err => console.log(err));
  }

  signup = () => {
    const { email, username, password } = this.state;
    const options = {
      email,
      username,
      password,
    }

    axios
      .post('/api/user/signup', options)
      .then(({ data }) => {
        this.props.userData(data);
        this.props.history.push('/home');
      })
      .catch(err => console.log(err));
  }

  switch = () => {
    this.setState({ login: !this.state.login });
  }

  render() {
    let { login } = this.state;

    return (
      <div>
        <div className="login">
          <form name={login ? "login" : "signup"} onSubmit={e => this.handleButton(e)}>
            <input type="text" name="username" placeholder="username" onChange={e => this.handleEntry(e)}/>
            <br/>
            {!login && <div><input type="text" name="email" placeholder="email" onChange={e => this.handleEntry(e)}/><br/></div>}
            <input type="password" name="password" placeholder="password" onChange={e => this.handleEntry(e)}/>
            <br/>
            <button>{login ? 'Login' : 'SignUp'}</button>
          </form>
          <button name="switch" type="button" onClick={e => this.handleButton(e)}>{login ? 'Go SignUp' : 'Go Login'}</button>
        </div>
      </div>
    )
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ userData }, dispatch);
}

export default connect(null, matchDispatchToProps)(Landing);