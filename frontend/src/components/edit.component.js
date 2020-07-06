import React,{Component} from 'react'
import axios from 'axios'
class Edit extends Component{
    constructor(props){
        super(props)
    }
    state={
        added_date:new Date().toString(),
        task:null,
        last_date:null
    }
    componentDidMount=()=>{
        let id=this.props.match.params.id;
        axios.get('http://localhost:300/todos/'+id)
        .then(response => {var dt=response.data.last_date;dt=new Date(dt); var dtt=dt.getDate();var mt=dt.getMonth()+1;   var mt = ("0" + mt).slice(-2)  ;var yr=dt.getFullYear(); var ld=yr+'-'+mt+'-'+dtt;this.setState({'task':response.data.task,'last_date':ld});})
        .catch(error => {console.log(error)})

    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleDate=(e)=>{
        const last_date=e.target.value
        this.setState({
            'last_date':last_date
        })

    }

    handleSubmit=(e)=>{
        let id=this.props.match.params.id;
        var last_date=this.state.last_date;
        e.preventDefault();
        last_date=new Date(last_date).toString()
        this.setState({
            'last_date':last_date
        },function(){
            axios.post('http://localhost:300/todos/'+id,this.state)
            .then(res=>{if(res.data.edited){alert('task edited');this.props.history.push('/user')}else{console.log(res.error+' unable to edit,try again later')}})

        })


    }
render(){
    return(<div className='container center_div'>
    <form onSubmit={this.handleSubmit} className="align-middle spacing">
    <h1 className="sign_in_text text_center"> Edit Task</h1>
    <br>
    </br>
    <div className='container form-group'>
    <label className='float-left'>Task: </label> 
    <input value={this.state.task} onChange={ this.handleChange } type="text"  name='task' id="inputTask" className="form-control btn-lg" placeholder="Enter Task" required autofocus=""/>
    </div>
    <div className='container form-group'>
    <label className='float-left'>Enter Last Date: </label> 
    <input value={this.state.last_date} onChange={ this.handleDate } type="date"  name='last_date' id="inputLastDate" className="form-control btn-lg" placeholder="Enter Last Date" required autofocus=""/>
    </div>
    <div>
    </div>
    <div className='container form-group'>
    <button className="btn btn-primary btn-block btn-lg"><i className="fas fa-sign-in-alt"></i> Submit</button>
    </div>
    <hr/>        
    </form>
    </div>)
}
}
export default Edit

// value={this.state.last_date