/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, signInWithGoogle } from '../redux/features/user/userSlice';
import toast,{Toaster}  from 'react-hot-toast';
import Lottie from "lottie-react";
import signup from "../assets/signup.json";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const { handleSubmit, register, control } = useForm();
  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const {isLoading,isError,error,email} = useSelector((state)=>state.userSlice) 

  useEffect(() => {
    if (
      password !== undefined &&
      password !== '' &&
      confirmPassword !== undefined &&
      confirmPassword !== '' &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(()=>{
    if(isError && error)
    {toast.error(error)}
  },[isError, error])

  useEffect(()=>{
    if(!isLoading && email){
      toast.success('Successfully sign Up');
      navigate('/');
    }
    
  },[isLoading , email])

  const onSubmit = ({ displayName, email, password,photoURL }) => {
    dispatch(createUser({
      email,
      password,
      displayName,
      photoURL
    }))
    toast.success('Successfully sign Up')
    console.log(displayName, email, password,photoURL);
  };

 
 //   with google sign up
 const handelGoogleRegister = ({ displayName, email, password,photoURL }) => {
  dispatch(signInWithGoogle({
    email,
    password,
    displayName,
    photoURL
  }))
  toast.success('Successfully sign Up')
    console.log(displayName, email, password,photoURL);
};



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto h-screen items-center">
     <Toaster />
      <div className="w-full">
      <Lottie animationData={signup} loop={true} />
      </div>
      <div className="w-full p-4  grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Sign up</h1>
          <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                id="displayName"
                className="w-full rounded-md"
                {...register('displayName')}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register('email')}
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="photoURL">
                <span className="label-text">Image URL</span>
              </label>
              <input
                id="photoURL"
                {...register("photoURL")}
                type="text"
                placeholder="Your Image URL"
                className="w-full rounded-md"
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register('password')}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="w-full rounded-md"
                {...register('confirmPassword')}
              />
            </div>
            <div className="!mt-8 ">
              <button
                type="submit"
                className="btn btn-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={disabled}
              >
                Sign up
              </button>
            </div>
            <div>
              <p>
                Already have an account?{' '}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Login
                </span>
              </p>
            </div>
            <div
              onClick={handelGoogleRegister}
              className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
            >
              <FcGoogle size={32} />

              <p>Continue with Google</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
