import user from '../models/user_model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createAccessToken from '../libs/jwt.js';

export const register=async(req,res)=>{
    const {email,password,username} =req.body;
   try{
    const passwordHash =await bcrypt.hash(password,10);

    const newUser= new user({
        username,
        email,
        password:passwordHash,
    });

 const userSaved= await newUser.save();
 ///creation of the token
 const token =await createAccessToken({id:userSaved._id});

 res.cookie('token',token);
  res.status(200).json(
    {status:"success",
    message:"user saved successFully",
    id:userSaved.id,
    username:userSaved.username,
    email:userSaved.email,
    createdAt:userSaved.createdAt,
    updatedAt:userSaved.updatedAt,
    });

}catch(error){
    res.status(500).json({
        status:"error",
        message:error.message,
    });
}

}

export const login=(req,res)=>{
    res.send('login');
}