const moongose=require('mongoose')
const schema=moongose.Schema;

const userSchema=new schema({
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String},
    password:{type:String}
})

const user=moongose.model('users',userSchema)
module.exports=user