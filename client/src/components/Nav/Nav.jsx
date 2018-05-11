import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
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
            Logout
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

export default connect(mapStateToProps)(Nav);