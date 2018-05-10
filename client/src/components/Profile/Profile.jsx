import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { updateUserData } from '../../redux/actions';

import './Profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      level: '',
      wins: 0,
      losses: 0,
      showFriendRequests: false,
      friendRequests: []
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    const { friendRequests } = this.props.userData;
    console.log(state);

    this.setState({ friendRequests });

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
      .post('api/friend/friendRequest', options)
      .then(({ data }) => console.log('friendRequest data: ', data))
      .catch(err => console.log(err));
  }

  addFriend = ({ friend_requests }, index) => {
    let { userData, updateUserData } = this.props;
    let { friendRequests } = this.state;
    friendRequests.splice(index, 1);

    this.setState({ friendRequests });

    userData.friendRequests = friendRequests;
    updateUserData(userData);

    const options = {
      id: friend_requests.id
    }

    axios
      .post('api/friend/validateFriendRequest', options)
      .then(() => console.log('sent accepted friend request'))
      .catch(err => console.log(err));
  }

  button = () => {
    console.log(this.state);
    console.log(this.props);
  }

  showFriendRequests = () => {
    this.setState({ showFriendRequests: !this.state.showFriendRequests })
  }

  render() {
    let { username, level, wins, losses, showFriendRequests, friendRequests } = this.state;
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
            <button type="button" onClick={this.showFriendRequests}>
              friend requests
            </button>
            {showFriendRequests && 
              <div>
                {friendRequests.map((request, index) => 
                  <div key={index}>
                    {request.username} 
                    <button type="button" onClick={() => this.addFriend(request, index)}>accept</button>
                  </div>)}
              </div>
            }   
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
  return bindActionCreators({ updateUserData }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);