import React, { Component } from 'react';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchedUsers } from '../../redux/actions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuery: '',
    }
  }

  handleEntry = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  findUsers = (e) => {
    e.preventDefault();
    const { userQuery } = this.state;
    const options = {
      params: {
        username: userQuery,
      }
    }

    axios
      .get('/api/user/search', options)
      .then(({ data }) => {
        this.props.searchedUsers(data);
        this.props.history.push('/welcome/userSearchResults');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.findUsers(e)}>
          <input name="userQuery" placeholder="search users" type="text" onChange={e => this.handleEntry(e)}/>
          <button type="button" onClick={this.findUsers}>search</button>
        </form>
      </div>
    )
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    searchedUsers,
  }, dispatch);
}

export default connect(null, matchDispatchToProps)(Search);