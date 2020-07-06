import React,{Component} from 'react';
import logo from './logo.svg';
import {BrowserRouter,Route,Switch, Router} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './components/login.component'
import Header from './components/header.component'
import SignUp from './components/signup.component'
import Tasks from './components/tasks.component'
import Add from './components/add.component'
import Edit from './components/edit.component'

class App extends Component{

  state={
    email:''
  }
  changeEmail=(email)=>
  {
    this.setState({
      email: email,
    })
  }
render() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header email={this.state.email} changeEmail={this.changeEmail}/>
      <Switch>
      <Route path='/signup' component={SignUp}></Route>
      <Route path='/user' component={Tasks}></Route>
      <Route path='/add' component={Add}></Route>
      <Route path='/edit/:id' component={Edit}></Route>
      <Route path='/' render={props=><Login changeEmail={this.changeEmail}/>}></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}}

export default App;
