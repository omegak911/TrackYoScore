import React, { Component } from 'react';
import axios from 'axios';


import { Link } from 'react-router-dom';
import UserSearchResult from './UserSearchResult';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuery: '',
      searchResults: [],
      searched: false,
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
        console.log(data)
        this.setState({ searchResults: data, searched: true })
      })
      .catch(err => console.log(err));
  }

  render() {
    let { searchResults, searched } = this.state;
    return (
      <div>
        <form onSubmit={e => this.findUsers(e)}>
          <input name="userQuery" placeholder="search users" type="text" onChange={e => this.handleEntry(e)}/>
          <button type="button" onClick={this.findUsers}>search</button>
        </form>
        <div>
        {searched &&
          <div>
            {searchResults.length > 0 ? 
              <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '70vh', 
                  overflow: 'scroll', 
                  backgroundColor: 'white',
                  marginTop: '5px',
                  }}>
                {searchResults.map((user, index) =>
                  <div key={index} style={{ border: '1px solid black', padding: '5px'}}>
                    {user.username}
                    <Link to={{ pathname: "/welcome/profile", state: { user: { id: user.id }}}} >{user.username}</Link>
                  </div>
                )}
              </div>
              :
              <span style={{ color: 'red' }}>
                No Results
              </span>
            }
          </div>
        }
        </div>
      </div>
    )
  }
}

export default Search;