import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import md5 from 'md5-hash';
import axios from 'axios';

const CLIENT_ID = '801995831613-ddtfhtnc7vlvepcuk7hb2hdqkb98fehe.apps.googleusercontent.com';

class Login extends Component{
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  state=
  {
      email:null,
      password:null,
  }
  
  handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:300/validate',this.state)
    .then(res=>{if(res.data.validated){this.props.changeEmail(this.state.email);sessionStorage.setItem('email', this.state.email);sessionStorage.setItem('id',res.data.id);this.props.history.push('/user')}else{console.log('unable to submit,try again later'+res.data.error)}})

  }

  handleChange=(e)=>{
    var data=e.target.value;
    if(e.target.name === 'password')
    {
      data=md5(String(data))
    }
  
    this.setState({
      [e.target.name]:data
    })
  }

    render(){
        return(
          <div className='container center_div'>
          <form onSubmit={this.handleSubmit} className="align-middle spacing">
          <h1 className="sign_in_text text_center"> Sign in</h1>
          {/* <div className='form-group'>
          <GoogleLogin clientId={CLIENT_ID}  onSuccess={ this.google_login } onFailure={ this.handleLoginFailure } cookiePolicy={ 'single_host_origin' } responseType='code,token' />
          </div> */}
          <div className='container form-group'>
          <input onChange={ this.handleChange } type="email"  name='email' id="inputEmail" className="form-control btn-lg" placeholder="Email address" required autofocus=""/>
          </div>
          <div className='container form-group'>
          <input onChange={ this.handleChange } name='password' type="password" id="inputPassword" className="form-control btn-lg" placeholder="Password" required/>
          </div>
          <div className='container form-group'>
          <button className="btn btn-primary btn-block btn-lg"><i className="fas fa-sign-in-alt"></i> Sign in</button>
          </div>
          <hr/>
          <div className='container form-groupx'>
          <button className="btn btn-outline-dark btn-block btn-lg" type="button" id="btn-signup"> <Link to='/signup'>Sign up New Account</Link></button>   
          </div>         
          </form>
          </div>
        )
     
        }
}

export default withRouter(Login);
