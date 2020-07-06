import React,{Component} from 'react'
import axios from 'axios'
import {Link,withRouter} from 'react-router-dom';
class Tasks extends Component
{
  
  state={
      tasks:[]
  }
  
    componentDidMount(){
        axios.get('http://localhost:300/todos/get/'+sessionStorage.getItem('email'))
         .then(response => {console.log(response);this.setState({tasks:response.data})})
         .catch(error => {console.log(error)})
    }
    deleteTodo=(e)=>{
        const id=e.target.id;
        axios.delete('http://localhost:300/todos/'+id)
         .then(response => {console.log(response);this.setState({tasks: this.state.tasks.filter(el => el._id !== id)})})
         .catch(error => {console.log(error)})
    }

    check=()=>{
        if(!sessionStorage.getItem('email')){
            this.props.history.push('/')
        }
      }
      
    edit=(e)=>{
        const id=e.target.id;
        this.props.history.push('/edit/'+id)


    }  
render(){
    this.check();
    const tasks=this.state.tasks.length?(this.state.tasks.map( task => { return (<div><div className="container bcontent">
    <hr />
    <div className="list-group card">
    
        <div className="row no-gutters">

            <div className="col-sm-12">
            <h2 id={task._id} title='Edit This Task' onClick={this.edit} className="card-header">{task.task}</h2>
                <div   className="card-body">
                  <div><a onClick={this.deleteTodo}><i id={task._id}  className="fa fa-trash-o float-right pointer"></i></a></div>
                  <div><b className="card-text">Added Date : {task.added_date}</b></div> 
                    <div><b className="card-text">Last Date: {task.last_date}</b></div>
                </div>
            </div>
        </div>
    </div>
</div></div>)})):(
    <div className="text-center jumbotron">Loading post...</div>
);  
return(
    <div>
        <Link to='/add'><i className="fa fa-plus-circle float-right fa-4x add" aria-hidden="true"></i></Link>
              
          <div className="container">
      
                {tasks}
                </div>
    </div>

)
}
}
{/* <Link to='/add'><i class="fa fa-plus-circle float-right fa-4x add" aria-hidden="true"></i></Link> */}
export default withRouter(Tasks)