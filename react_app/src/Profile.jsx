import React, {Component} from 'react';
import Header from './lp/Header.jsx';
import Footer from './lp/Footer.jsx';
import SelectTrip from './forms/SelectTrip.jsx'
import {Link,Redirect} from 'react-router-dom';
import AuthService from './forms/AuthService';
import withAuth from './forms/withAuth'
import axios from 'axios';

class Profile extends Component{
  render(){
      if(this.props.redirect){
    return (<Redirect push to={this.props.redirect}/>)
   }
    let detail = (
        <div className="container">
          <div className="row">
              <h1>Your Profile</h1>
              <div className="col-xs-2 col-sm-2 col-md-3 col-ls-3">
                <img src="/images/profile/profile.png" />
              </div>
              <div className="col-xs-10 col-sm-10 col-md-9 col-ls-9">
                <ul>
                  <li>Name: {this.props.currentUser.first_name} </li>
                  <li>Username: {this.props.currentUser.username}</li>
                  <li>Email: {this.props.currentUser.email}</li>
                </ul>
              </div>
          </div>
        </div>
      );
    return (
      <div className="profile">
        <Header currentUser={this.props.currentUser} handleLogout={this.props.handleLogout} redirect={this.props.redirect}/>
        <section>
          {detail}
        </section>
        <SelectTrip />
        <Footer />
      </div>
    );
  }
}

export default Profile;