const router=require('express').Router();
const model_path='../models/'
let todos=require(model_path+'todos.model')


router.route('/get/:email').get(function(req,res){
    const email=req.params.email;
   todos.find({'email':email},function(err,tasks){
       if(!err)
       {
           res.json(tasks)
       }
       else{
           res.json('Error is '+err)
       }
   })
})

router.route('/add').post(function(req,res){
    const todo=new todos(req.body);
    todo.save()
     .then(()=>res.json({'added':true,'status':res.status,'message':'Task Added'}))
     .catch(err =>res.status(400).json({'added':false,'Error':err}))

})

router.route('/:id').delete(function(req,res){
    todos.findByIdAndDelete(req.params.id)
     .then(()=>res.json('Exercise Deleted'))
     .catch(err=>res.status(400).json('Error'+err))

})

router.route('/:id').post(function(req,res){
    todos.findByIdAndUpdate({'_id':req.params.id},req.body,function(err,result){
        if(err)
        {
            res.json({'edited':false,'error':err})
        }
        else
        {
            res.json({'edited':true,'result':result})
        }
    }) 

})

router.route('/:id').get(function(req,res){
    todos.findOne({'_id':req.params.id},function(err,obj){
        if(err){
            res.json(err)
        }
        else{
            res.json(obj)
        }
    })
})
module.exports=router;  