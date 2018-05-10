import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userData } = this.props;

    return (
      <div>
      hello from Nav
      {userData && 
        <div>
          <div>
            <Link to="/home" >Home</Link>
          </div>
          <div>
            <Link to={{ pathname: "/profile", state: { user: { id: userData.id }}}} >Profile</Link>
          </div>
          <div>
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