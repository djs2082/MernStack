import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
class Header extends Component{  constructor() {
  super();
}
logout=()=>{
  sessionStorage.clear();
  this.props.history.push('/')
}

    render(){
        return(
            <div class="container">
  <div class="jumbotron">
  {this.props.email?<button onClick={this.logout} className='float-right btn-dark btn-lg'>LogOut</button>:""}
    <h1>My TODO App</h1>   
    <p>{this.props.email}</p>   
  </div>
  
</div>
        )
    }
}
export default withRouter(Header)