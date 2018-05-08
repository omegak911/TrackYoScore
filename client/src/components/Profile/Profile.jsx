import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios';

import './Profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      level: '',
      wins: 0,
      losses: 0,
    };
  }

  componentDidMount() {
    const { state } = this.props.location;

    console.log(state);

    //one condition if user goes to own profile

    //2nd condition if user goes to another profile
    let options = {
      params: {
        id: state.user.id
      }
    }
    
    axios
      .get('/api/user/profile', options)
      .then(({ data }) => {
        console.log(options)
        console.log(data)
        const { username, level, wins, losses } = data;
        this.setState({ username, level, wins, losses })
      })
      .catch(err => console.log(err));
  }

  friendRequest = () => {
    const { state } = this.props.location;

    let options = {
      requestorId: this.props.userData.id,
      requesteeId: state.user.id
    }

    axios
      .post('api/user/friendRequest', options)
      .then(({ data }) => console.log('friendRequest data: ', data))
      .catch(err => console.log(err));
  }

  button = () => {
    console.log(this.state);
    console.log(this.props);
  }

  render() {
    let { username, level, wins, losses } = this.state;
    const { userData } = this.props;

    return (
      <div>
        welcome to Profile
        <button onClick={this.button}>*********</button>
        <div className="container">
          <div className="profileImage">
            Profile Image
          </div>
        </div>

        <div className="container">
          <div className="profileStats">
            username: { username }
            <br/>
            level: { level }
            <br/>
            wins: { wins }
            <br/>
            losses { losses }
          </div>
        </div>

        <div className="container">
          <div className="profileBio">
            bio
          </div>
        </div>
        
        {userData.username !== username &&
        <button type="button" onClick={this.friendRequest}>Add Friend</button>
        }

        {userData.username === username && 
          <div>
            friend requests
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

export default connect(mapStateToProps)(Profile);