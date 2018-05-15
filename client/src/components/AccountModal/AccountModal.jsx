import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateUserData } from '../../redux/actions';

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

  render() {
    return (
      <div className="veilOfDarkness" onClick={() => this.props.showList({ target: { name: "account"}})}>
        <div className="accountDetails" onClick={e => this.stopPropagation(e)}>
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