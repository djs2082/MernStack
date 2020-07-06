import React,{Component} from 'react'
import axios from 'axios'
class Add extends Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        var last_date=new Date();
        last_date=last_date.toString()

      }

      check=()=>{
        if(!sessionStorage.getItem('email')){
            this.props.history.push('/')
        }
      }


      state={
          added_date:new Date().toString(),
          task: null,
          last_date: null,
          email: sessionStorage.getItem('email')
      }

      handleChange=(e)=>{
          this.setState({
              [e.target.name]:e.target.value
          })
      }

      handleDate=(e)=>{
          const last_date=new Date(e.target.value)
          this.setState({
              last_date:last_date.toString()
          })
      }

      handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:300/todos/add',this.state)
        .then(res=>{if(res.data.added){console.log(res.message);alert('task added');this.props.history.push('/user')}else{console.log(res.error+' unable to submit,try again later'+res.error)}})

      }

render(){
    this.check();
    return(
<div className='container center_div'>
<form onSubmit={this.handleSubmit} className="align-middle spacing">
<h1 className="sign_in_text text_center"> Add Task</h1>
<br>
</br>
<div className='container form-group'>
<label className='float-left'>Enter Task: </label> 
<input onChange={ this.handleChange } type="text"  name='task' id="inputTask" className="form-control btn-lg" placeholder="Enter Task" required autofocus=""/>
</div>
<div className='container form-group'>
<label className='float-left'>Enter Last Date: </label> 
<input onChange={ this.handleDate } type="date"  name='last_date' id="inputLastDate" className="form-control btn-lg" placeholder="Enter Last Date" required autofocus=""/>
</div>
<div>
</div>
<div className='container form-group'>
<button className="btn btn-primary btn-block btn-lg"><i className="fas fa-sign-in-alt"></i> Submit</button>
</div>
<hr/>        
</form>
</div>
)
}
}
export default Add;