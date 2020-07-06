const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const cors=require('cors')
require('dotenv').config()

const app=express()
const port=process.env.PORT || 500
const uri='mongodb+srv://sggs:sggs@mycluster-ssb6s.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority';

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

app.listen(port,()=>{
    console.log('running on port '+port)
})

module.exports=app;