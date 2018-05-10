import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { updateUserData, updatePendingFriendRequests, updateFriendList } from '../../redux/actions';

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
      friendRequests: [],
      friends: [],
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    const { friends, userData, pendingFriendRequests } = this.props;

    let options = {
      params: {
        id: state.user.id
      }
    }
    
    axios
      .get('/api/user/profile', options)
      .then( async ({ data }) => {
        const { username, level, wins, losses } = data;
        await this.setState({ username, level, wins, losses });

        if (username === userData.username) {
          await this.setState({ friendRequests: pendingFriendRequests, friends });
        }
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
    let { friends, userData, updatePendingFriendRequests, updateFriendList } = this.props;
    let { friendRequests } = this.state;
    let remainingRequests = friendRequests.slice();
    let updatedFriendsList = friends.slice();

    let user = remainingRequests.splice(index, 1)[0];

    updatedFriendsList.push({ id: user.id, username: user.username });
    //add to redux friends (not replace)
    updateFriendList(updatedFriendsList);
    //remove from redux friendRequests
    updatePendingFriendRequests(remainingRequests);
    //update state for re-render
    this.setState({ friends: updatedFriendsList, friendRequests: remainingRequests });

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
    let { username, level, wins, losses, showFriendRequests, friendRequests, friends } = this.state;
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
    friends: state.friends,
    pendingConfirmations: state.pendingConfirmations,
    pendingFriendRequests: state.pendingFriendRequests
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ updateUserData, updatePendingFriendRequests, updateFriendList }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);