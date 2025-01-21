 import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
 
 const Login = () => {
    const [message, setMessage] = useState("")
    const {loginUser,signInWithGoogle} = useAuth();
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = async(data) => {
        try{
            await loginUser(data.email,data.password);
            alert("Login Successful!");
            navigate("/")
        }catch(error){
            setMessage("Please provide a valid email and password")
        }
      }

      const handleGoogleSignIn = async ()=>{
        try{
            await signInWithGoogle();
            alert("Login successful!")
            navigate("/")
        }catch(error){
            alert("Google signin failed!")
            console.error(error)
        }
      }

   return (
    <div className='h-[calc(100vh-120px)] flex items-center justify-center'>
    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className='text-xl font-semibold mb-4'>Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Email
                </label>
                <input
                    {...register("email", { required: true })}
                    type="email"
                    name='email'
                    id="email"
                    placeholder="Email Address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                {...register("password", { required: true })}
                    type="password"
                    name='password'
                    placeholder="Password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
                
            <div className="flex flex-wrap space-y-2.5 items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Login
                </button>
            </div>
        </form>
        <p className="inline-block align-baseline font-medium mt-4 text-sm ">
            Haven't an account? Please
            <Link to="/register" className='text-blue-500 hover:text-blue-800'> Register</Link>
        </p>
        <div className="mt-4">
            <button
                className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleGoogleSignIn}
            >
                <FaGoogle className="mr-2" />
                <div>
                    
                </div>
                Sign in with Google
            </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs">
            &copy;2025 Book Store. All rights reserved.
        </p>
    </div>
</div>
   )
 }
 
 export default Login