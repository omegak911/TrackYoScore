import React, { Component } from 'react';
import axios from 'axios';

import UserSearchResult from './UserSearchResult';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuery: '',
      searchResults: []
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
        this.setState({ searchResults: data })
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

export default Search;