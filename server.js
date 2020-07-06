const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const cors=require('cors')
const path=require('path'); 
require('dotenv').config()


const app=express()
const port=process.env.PORT || 300
const uri= process.env.MONGODB_URI || 'mongodb+srv://sggs:sggs@mycluster-ssb6s.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority';

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use(bodyparser.json())

mongoose.connect(uri,{useNewUrlParser: true,useCreateIndex: true})
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Mongo Connection established')
})

route_path='./routes/'

var todos=require(route_path+'todos')
var users=require(route_path+'users')

app.use('/',users)
app.use('/todos',todos)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'frontend','build','index.html'));
    })

}
app.listen(port,()=>{
    console.log('running on port '+port)
})


module.exports=app;