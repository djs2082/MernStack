const mongoose=require('mongoose')
const schema=mongoose.Schema;

const todo_schema=new schema(
{
    email:{type:String},
    
    added_date:{type:Date},

    task:{type:String},

    last_date:{type:Date}

},
{
    timestamps:true,
})

const todo=mongoose.model("todos",todo_schema)
module.exports=todo