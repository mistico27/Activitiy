import {useForm} from 'react-hook-form';
import {registerRequest} from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';


function RegisterPage(){
    const{register,handleSubmit,formState:{errors},}=useForm();
    //calling register
    const {signUp,isAuthenticated,errors:registerErrors} = useAuth();
    const navigation = useNavigate();
    
    useEffect(()=>{
        if(isAuthenticated) navigation('/tasks')
    },[isAuthenticated]);

    const onSubmit = handleSubmit(async(values)=>{
        signUp(values);
    });

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>  
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                registerErrors.map((error,i)=>(
                    <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                    </div>
                ))                
            }
            <form onSubmit= {onSubmit}>
            <h1 className='text-3xl font-bold my-2'>Register</h1>

            <input type="text" {...register("username",{required:true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='username'/>
                {
                    errors.username &&(
                        <p className='text-red-500'>username is required</p>
                    )
                }
            <input type="email" {...register("email",{required:true})} 
                 className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                 placeholder='email'/>
                 {
                    errors.email &&(
                        <p className='text-red-500'>email is required</p>
                    )
                }
            <input type="password" {...register("password",{required:true})}
                 className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                 placeholder='password'/>

                 {
                    errors.password &&(
                        <p className='text-red-500'>password is required</p>
                    )
                }
            <button type='submit'
            className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'
            >Register</button>
            </form>
            <p className='flex gap-x-2 justify-between'>
                If you already have an account <Link to="/login" className='text-sky-500'>Please login</Link> 
               </p> 
        </div>
        </div>
    );
}

export default RegisterPage;