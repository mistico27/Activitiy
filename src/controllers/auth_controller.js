import user from '../models/user_model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createAccessToken from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';

export const register=async(req,res)=>{
    
   try{
    const {email,password,username} =req.body;
    const userFoundII =await user.findOne({email});
    if(userFoundII){
        return res.status(400).json(
        ['The email already exists'],
        )
    }
    ///hashing password
    const passwordHash =await bcrypt.hash(password,10);

    const newUser= new user({
        username,
        email,
        password:passwordHash,
    });

 const userSaved= await newUser.save();
 ///creation of the token
 const token =await createAccessToken({id:userSaved._id,});

 res.cookie('token',token,{
    secure:true,
    sameSite:"none",
 });
  res.status(200).json(
    {
    id:userSaved.id,
    username:userSaved.username,
    email:userSaved.email,
    createdAt:userSaved.createdAt,
    updatedAt:userSaved.updatedAt,
    });

}catch(error){
    res.status(500).json({message:error.message});
}

}

export const login=async(req,res)=>{
   try{
    const {email,password} =req.body;
    const userFound = await user.findOne({email});
    if(!userFound){
        return res.status(400).json(["user was not userFound, try again"],);
    }
    const isMatching =await bcrypt.compare(password,userFound.password);

    if(!isMatching){
        return res.status(400).json(["Incorrect Password"],);
    }
 ///creation of the token
 const token =await createAccessToken({id:userFound._id,username:userFound.username});

 res.cookie('token',token,{
    secure:true,
    sameSite:"none",
 });
  res.json(
    {
    id:userFound.id,
    username:userFound.username,
    email:userFound.email,
    createdAt:userFound.createdAt,
    updatedAt:userFound.updatedAt,
    });

}catch(error){
    res.status(500).json({message:
       error.message,
    });
}

}

export const logout = (req,res)=>{
    res.cookie('token',"",{
        expires:new Date(0)
    })
    return res.sendStatus(200);
}

export const profile =async (req,res)=>{
    const userFound = await user.findById(req.user.id);
    if(!userFound){
        return res.status(400).json(
           ["user not found"]
        );
    }

    return res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        createdAt:userFound.createdAt,
        updatedAt:userFound.updatedAt,
    })
}

export const verifyToken = async(req,res)=>{
   const{token}= req.cookies;
   if(!token){
        return res.status(401).json({
            message:"Unauthorized",
        });
   }
   jwt.verify(token,TOKEN_SECRET,async(error,myUser)=>{
    if(error){
        res.status(401);
    }
   const userFoundIII = await user.findById(myUser.id);   
   if(!userFoundIII){
    return res.status(401);
    }
   
   return res.json({
        id:userFoundIII._id,
        username:userFoundIII.username,
        email:userFoundIII.email
      });
   });
}