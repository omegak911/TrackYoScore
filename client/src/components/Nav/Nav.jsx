import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { logout } from '../../redux/actions';

import './Nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    axios
      .post('/api/auth/logout')
      .then(() => this.props.logout())
      .catch(err => console.log(err))
  }

  render() {
    const { userData } = this.props;

    return (
      <div className="nav">
      {userData && 
        <div className="navContainer">
          <div className="navLeft">
            <div className="linkContainer">
              <Link to="/welcome/home" >Home</Link>
            </div>
            <div className="linkContainer">
              <Link to={{ pathname: "/welcome/profile", state: { user: { id: userData.id }}}} >Profile</Link>
            </div>
            <div className="linkContainer">
              <Link to="/welcome/history" >History</Link>
            </div>
            <div className="linkContainer">
              <Link to="/welcome/addGame" >Add A Game</Link>
            </div>
            <div className="linkContainer">
              <Link to="/welcome/findUser" >Find A User</Link>
            </div>
          </div>
          <div className="navRight">
            <div className="linkContainer">
              <Link to="/" onClick={this.logout}>Logout</Link>
            </div>
          </div>
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Nav);