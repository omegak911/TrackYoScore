import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

import { updateUserData, updatePendingFriendRequests, updateFriendList } from '../../redux/actions';
import { CLOUD_NAME } from '../../../../config';

import AccountModal from './AccountModal/AccountModal';

import './Profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: '',
      url: 'Loading_Art',
      level: null,
      wins: 0,
      losses: 0,
      friends: [],
      areFriends: false,
      showFriendRequests: false,
      showFriendList: false,
      friendRequests: [],
      alreadyAPendingRequest: false,
      account: false,
      throttle: false
    };
  }

  componentDidMount() {
    setTimeout( () => {
      const { state } = this.props.location;
      if (state) {
        this.updateState();
      } else {
        this.props.history.push('/welcome/home')
      }
    }, 100)
  }

  updateState = () => {
    const { state } = this.props.location;
    const { friends, userData, pendingFriendRequests } = this.props;
    const { id } = this.state;

    let options = { params: { id: state ? state.user.id : userData ? userData.id : id }}
    
    axios
      .get('/api/user/profile', options)
      .then( async ({ data }) => {
        const { id, username, level, wins, losses, url } = data;
        await this.setState({ id, username, level, wins, losses, url });
        //determine if it's the user's profile.  If not, are they already friends
        if (username === userData.username) {
          await this.setState({ areFriends: true });
        } else {
          for (let i = 0; i < friends.length; i++) {
            if (friends[i].username === username) {
              await this.setState({ areFriends: true });
            }
          }
        }
        await this.setState({ friendRequests: pendingFriendRequests, friends });
      })
      .catch(err => console.log(err));
  }

  friendRequest = () => {
    let { friendRequests, id } = this.state;

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
        requesteeId: id
      }
      
      axios
        .post('api/friend/friendRequest', options)
        .then(({ data }) => {
          console.log('friendRequest data: ', data)
          if (data === 'fail') {
            this.setState({ alreadyAPendingRequest })
          }
        })
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
    console.log(stateKey);
    this.setState({ [stateKey]: !this.state[stateKey] })
  }

  showStoreAndState = () => {
    console.log(this.props);
    console.log(this.state);
  }

  render() {
    let {
      username, 
      url,
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
      <div className="profileTopContainer">
        <div className="container">
          {/* <div className="profileImage">
            Profile Image
            <img src={url} alt="profile pic"/>
            <button type="button" onClick={this.showStoreAndState}>****</button>
          </div> */}
          <Image cloudName={CLOUD_NAME} publicId={url} >
            <Transformation aspectRatio="1:1" background="#262c35" border="5px_solid_rgb:FFFFFF" gravity="auto" radius="max" crop="fill" />
          </Image>
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

        {userData && userData.username === username && 
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
                    <AccountModal showList={this.showList} />
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
    historyConfirmations: state.historyConfirmations,
    pendingFriendRequests: state.pendingFriendRequests
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ updateUserData, updatePendingFriendRequests, updateFriendList }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);