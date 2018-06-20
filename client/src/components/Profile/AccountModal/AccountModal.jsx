import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { updateUserData } from '../../../redux/actions';

import './AccountModal.scss';

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
    console.log(this.state)
    const { username, cPassword, nPassword, nPassword2 } = this.state;

    if (cPassword === nPassword) {
      //do this
    }

    if (nPassword !== nPassword2) {
      //do this
    }

    //send axios request and if failed, it means username is already taken
    //otherwise, update redux with new username

  }

  handleDrop = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', `codeinfuse, medium, gist`);
    formData.append('upload_preset', 'a5d7bdux')
    formData.append('api_key', toTheCloud);
    formData.append('timestamp', (Date.now() / 1000) | 0);

    axios
      // .post('https://api.cloudinary.com/v1_1/codeinfuse/image/upload', 
      .post('URL',
        formData, 
        { headers: {'X-Requested-With': 'XMLHttpRequest'}})
      .then(({ data }) => {
        console.log(data);
        const photoUrl = data.secure_url;
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="veilOfDarkness" onClick={() => this.props.showList({ target: { name: "account"}})}>
        <div className="accountDetails" onClick={e => this.stopPropagation(e)}>
          <Dropzone
            onDrop={this.handleDrop}
            multiple                //let's check what this means
            accept="image/*"
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