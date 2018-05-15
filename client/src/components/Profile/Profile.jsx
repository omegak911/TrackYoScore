import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { updateUserData, updatePendingFriendRequests, updateFriendList } from '../../redux/actions';

import AccountModal from '../AccountModal/AccountModal';

import './Profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: '',
      level: '',
      wins: 0,
      losses: 0,
      friends: [],
      areFriends: false,
      showFriendRequests: false,
      showFriendList: false,
      friendRequests: [],
      alreadyAPendingRequest: false,
      account: false,
    };
  }

  componentDidMount() {
    this.updateState();
  }

  //if we're navigated to a different profile, allow componentDidUpdate()
  shouldComponentUpdate() {
    let { id } = this.props.location.state.user;
    return id === this.state.id;
  }
  componentDidUpdate(prevProps, prevState) {
    let { id } = this.props.location.state.user;
    if (id !== prevState.id) {
      this.updateState();
    }
  }

  updateState = () => {
    const { state } = this.props.location;
    const { friends, userData, pendingFriendRequests } = this.props;

    let options = { params: { id: state.user.id }}
    
    axios
      .get('/api/user/profile', options)
      .then( async ({ data }) => {
        const { id, username, level, wins, losses } = data;
        await this.setState({ id, username, level, wins, losses });

        //determine if it's the user's profile.  If not, are they already friends
        if (username === userData.username) {
          await this.setState({ areFriends: true });
        } else {
          for (let i = 0; i < friends.length; i++) {
            if (friends[i].username === username) {
              this.setState({ areFriends: true });
            }
          }
        }
        await this.setState({ friendRequests: pendingFriendRequests, friends });
      })
      .catch(err => console.log(err));
  }

  friendRequest = () => {
    let { userData } = this.props;
    let { friendRequests, username } = this.state;

    //if there's already a pending request, tell the user
    let alreadyAPendingRequest = false;
    for (let i = 0; i < friendRequests.length; i++) {
      if (friendRequests[i].username === username) {
        alreadyAPendingRequest = true;
      }
    }

    if (alreadyAPendingRequest) {
      this.setState({ alreadyAPendingRequest });
    } else {
      let options = {
        requestorId: userData.id,
        requesteeId: username
      }

      axios
        .post('api/friend/friendRequest', options)
        .then(({ data }) => console.log('friendRequest data: ', data))
        .catch(err => console.log(err));
    }
  }

  acceptFriendRequest = ({ friend_requests }, index) => {
    let { friends, updatePendingFriendRequests, updateFriendList } = this.props;
    let { friendRequests } = this.state;
    //copy and remove added friend from pending requests then update friendslist
    let remainingRequests = friendRequests.slice();
    let updatedFriendsList = friends.slice();
    let user = remainingRequests.splice(index, 1)[0];
    updatedFriendsList.push({ id: user.id, username: user.username });
    this.setState({ friends: updatedFriendsList, friendRequests: remainingRequests });
    //update redux friendsList and pendingRequests
    updateFriendList(updatedFriendsList);
    updatePendingFriendRequests(remainingRequests);

    //update database friendsList and pendingRequests
    const options = {
      id: friend_requests.id
    }

    axios
      .post('api/friend/validateFriendRequest', options)
      .then(() => console.log('sent accepted friend request'))
      .catch(err => console.log(err));
  }

  showList = (e) => {
    const stateKey = e.target.name;
    this.setState({ [stateKey]: !this.state[stateKey] })
  }

  showStoreAndState = () => {
    console.log(this.props);
    console.log(this.state);
  }

  render() {
    let { 
      username, 
      level, 
      wins, 
      losses, 
      friends, 
      areFriends, 
      showFriendRequests, 
      showFriendList,
      friendRequests, 
      alreadyAPendingRequest,
      account } = this.state;
    const { userData } = this.props;

    return (
      <div>
        <div className="container">
          <div className="profileImage">
            Profile Image
            <button type="button" onClick={this.showStoreAndState}>****</button>
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
            bio text goes here, maybe a form
          </div>
        </div>
        
        {!areFriends &&
        <button type="button" onClick={this.friendRequest}>Add Friend</button>
        }

        {alreadyAPendingRequest &&
          <div>Request already exists, go check your profile to accept their request.</div>
        }

        {userData.username === username && 
          <div>

            <div>
              <button type="button" name="showFriendRequests" onClick={e => this.showList(e)}>
                friend requests
              </button>
              {showFriendRequests && 
                <div>
                  {friendRequests.map((request, index) => 
                    <div key={index}>
                      {request.username} 
                      <button type="button" onClick={() => this.acceptFriendRequest(request, index)}>accept</button>
                    </div>)}
                </div>
              }
            </div>

            <br/>

            <div>
              <button type="button" name="showFriendList" onClick={e => this.showList(e)}>
                friends
              </button>
              {showFriendList &&
                <div>
                  {friends.map((friend, index) =>
                    <div key={index}>
                      {friend.username}
                    </div>
                  )}
                </div>
              }   
            </div>
            
            <div>
              <div>
                <button type="button" name="account" onClick={e => this.showList(e)}>Account</button>
              </div>
              {account &&
                <div className="modal">
                  <div className="veilOfDarkness">
                    <AccountModal />
                  </div>
                </div>
              }
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
    friends: state.friends,
    pendingConfirmations: state.pendingConfirmations,
    pendingFriendRequests: state.pendingFriendRequests
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ updateUserData, updatePendingFriendRequests, updateFriendList }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);