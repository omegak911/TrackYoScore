import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { updateUserData } from '../../../redux/actions';


import './AccountModal.scss';

import { TO_THE_CLOUD, PIC_PRESET_NAME, CLOUD_URL } from '../../../../../config';

class AccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      cPassword: '',
      nPassword: '',
      nPassword2: '',
    }
  }

  handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value })
  }

  stopPropagation = (e) => {
    e.stopPropagation();
  }

  updateAccount = () => {
    const { username, cPassword, nPassword, nPassword2 } = this.state;

    if (cPassword === nPassword) {
      //do this
    }

    if (nPassword !== nPassword2) {
      //do this
    }

    //send axios request and if failed, it means username is already taken
    //otherwise, update redux with new username

    const data = {}

    axios
      .put('/api/user/updateUser', data)
      .then((result) => {
        //probably update the store and current profile state
        console.log(result)
      })
      .catch(err => console.log(err))
  }

  handleDrop = (file) => {
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append("upload_preset", PIC_PRESET_NAME);
    formData.append("api_key", TO_THE_CLOUD);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    axios
      .post(CLOUD_URL, formData, {headers: { "X-Requested-With": "XMLHttpRequest" }})
      .then(({ data }) => {
        //on success, send axios put request
        const url = data.secure_url;
        const urlArr = url.split('/');
        const photoName = urlArr[urlArr.length - 1].split('.')[0];
        axios
          .put('/api/user/updatePhoto', { url: photoName })
          .then(({ data }) => console.log('put data: ', data))
          .catch(err => console.log(err));
      })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="veilOfDarkness" onClick={() => this.props.showList({ target: { name: "account"}})}>
        <div className="accountDetails" onClick={e => this.stopPropagation(e)}>
          <Dropzone
            onDrop={this.handleDrop}
            multiple={false}            //let's check what this means
            accept="image/*"
            // maxSize={1000000}
            // style={}
            >
              <p>Upload image here</p>
            </Dropzone>
          <form onSubmit={this.updateAccount} onChange={e => this.handleChange(e)}>
            USERNAME
            <br/>
            <input type="text" name="username" />
            <br/>
            CURRENT PASSWORD
            <br/>
            <input type="password" name="cPassword" />
            <br/>
            NEW PASSWORD
            <br/>
            <input type="password" name="nPassword" />
            <br/>
            RE-ENTER PASSWORD
            <br/>
            <input type="password" name="nPassword2" />
            <br/>
            <button type="button" onClick={this.updateAccount}>UPDATE</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ updateUserData }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountModal);