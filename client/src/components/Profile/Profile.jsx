import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props)
  }

  componentDidMount() {
    const { state } = this.props.location;

    //one condition if user goes to own profile



    //2nd condition if user goes to another profile
    let options = {
      params: {
        id: state.user.id
      }
    }

    axios
      .get('/api/user/profile', options)
      .then(({ data }) => console.log('profile result: ', data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        welcome to Profile
      </div>
    )
  }
}

export default Profile;