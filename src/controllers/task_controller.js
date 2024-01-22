import { error } from 'console';
import task from '../models/task_model.js'


export const getTasks = async (req,res)=>{
    try{
    const tasks = await task.find({
        user:req.user.id
    }).populate('user');
    res.json(tasks);
}catch(error){
    return res.status(400).json({
        message:"task could not be created"
    });
}
};

export const createTasks = async (req,res)=>{
    try{
    const{title,description,date}=req.body;
    const newTask =new task({
        title,
        description,
        date,
        user:req.user.id,
    });
   const savedTask = await newTask.save();
   res.json(savedTask);
}catch(error){
    return res.status(400).json({
        message:"task could not be created"
    })
}
};

export const getTask = async (req,res)=>{
    try{
    const mytask =await task.findById(req.params.id).populate('user');
    if(!mytask){
        return res.status(404).send({message:error.message});
    }
    res.json(mytask);
    }catch(error){
        return res.status(400).json({
            message:"task not found"
        })
    }
};


export const updateTask = async (req,res)=>{
    try{
    const mytask =await task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!mytask){
        return res.status(404).send({message:"task not found"});
    }
    res.json(mytask);
    }catch(error){
      return  res.status(404).json({message:"task could not be found"});
    }
}


export const deleteTask = async (req,res)=>{
    try{
    const mytask =await task.findByIdAndDelete(req.params.id);
    if(!mytask){
        return res.status(404).send({message:error.message});
    }
     res.status(204).json("task has been deleted successfully");
}catch(error){
   return res.status(404).json({message:"task could not be deleted"});
} 
};