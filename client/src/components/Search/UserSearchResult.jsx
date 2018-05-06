import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let { listOfUsers } = this.props;
    return (
      <div>
        user search results
        {listOfUsers.map(user => {
          return (
            <div key={user.username}>
              <img src="" alt="profile pic goes here"/>
              <Link to={{ pathname: "/profile", state: { user } }}>{user.username}</Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listOfUsers: state.listOfUsers
  }
}


export default connect(mapStateToProps)(UserSearchResult);