const router=require('express').Router();
const model_path='../models/'
let users=require(model_path+'users.model')

router.route('/add').post(function(req,res){
    const user=new users(req.body)
    user.save()
     .then(()=>res.json(true))
     .catch(err=>res.json('Error '+err))
})

router.route('/validate').post(function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    users.count({'email':email,'password':password},function(err,count){
        if(count > 0)
        {
            users.findOne({email:email},function(err,obj){
                if(!err)
                {
                    res.json({'validated':true,'id':obj.id})
                }
                else{
                    res.json({'validated':false,'error':err})
                }
            })
        }
        else
        {
            res.json('invalid username or password')
        }
    });
})
module.exports=router; 