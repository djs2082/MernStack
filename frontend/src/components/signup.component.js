import React,{Component} from 'react';
import md5 from 'md5-hash';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
class SignUP extends Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    
      }
    
      state=
      {
          first_name:null,
          last_name:null,
          email:null,
          password:null,
          rep_password:null
      }


      handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.password != this.state.rep_password)
        {
            alert('both passwords do not match')
            return null;
        }
        axios.post('/add',this.state)
        .then(res=>{if(res.data){this.props.history.push('/')}else{console.log('unable to submit,try again later')}})
      }

      handleChange=(e)=>{
        var data=e.target.value;
        if(e.target.name === 'password' || e.target.name === 'rep_password')
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
            <h1 className="sign_in_text text_center"> Sign Up</h1>
            <div className='container form-group'>
            <input onChange={ this.handleChange } type="text"  name='first_name' id="inputFirstName" className="form-control btn-lg" placeholder="First Name" required autofocus=""/>
            </div>
            <div className='container form-group'>
            <input onChange={ this.handleChange } type="text"  name='last_name' id="inputLastName" className="form-control btn-lg" placeholder="Last Name" required autofocus=""/>
            </div>
            <div className='container form-group'>
            <input onChange={ this.handleChange } type="email"  name='email' id="inputEmail" className="form-control btn-lg" placeholder="Email address" required autofocus=""/>
            </div>
            <div className='container form-group'>
            <input onChange={ this.handleChange } name='password' type="password" id="inputPassword" className="form-control btn-lg" placeholder="Password" required/>
            </div>

            <div className='container form-group'>
            <input onChange={ this.handleChange } name='rep_password' type="password" id="rep_inputPassword" className="form-control btn-lg" placeholder="Password" required/>
            </div>
            <div className='container form-group'>
            <button className="btn btn-primary btn-block btn-lg"><i className="fas fa-sign-in-alt"></i> Sign Up</button>
            </div>
            <hr/>        
            </form>
            </div>
        )
    }
}
export default withRouter(SignUP)