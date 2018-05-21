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
    console.log('hmmmmm')
  }

  render() {
    const { userData } = this.props;

    return (
      <div>
      {userData && 
        <div className="navContainer">
          <div className="linkContainer">
            <Link to="/home" >Home</Link>
          </div>
          <div className="linkContainer">
            <Link to={{ pathname: "/profile", state: { user: { id: userData.id }}}} >Profile</Link>
          </div>
          <div className="linkContainer">
            <Link to="/history" >History</Link>
          </div>
          <div className="linkContainer">
            <Link to="/" onClick={this.logout}>Logout</Link>
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