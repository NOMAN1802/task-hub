import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signInWithGoogle } from '../redux/features/user/userSlice';
import Lottie from "lottie-react";
import login from "../assets/login.json";
import { useEffect} from 'react';
import toast,{Toaster}  from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isLoading, isError, error, email, name } = useSelector((state) => state.userSlice);


  useEffect(()=>{
    if(isError && error)
    {toast.error(error)}
  },[isError, error])

  useEffect(()=>{
    if(!isLoading && email){
      toast.success('Successfully Login');
      navigate('/');
    }
    
  },[isLoading , email])

  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({
       email, 
       password 
      }
      
      ))
      reset()
      toast.success('Successfully sign In')
      console.log(name, email, password); 
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
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl h-screen items-center mx-auto">
      <Toaster />
      <div className="w-full">
      <Lottie animationData={login} loop={true} />
      </div>
      <div className="w-full grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register('password')}
              />
            </div>
            <div className="relative !mt-8">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
            <div>
              <p>
                Don&apos;t have an account?{' '}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
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

export default Login;
