/* eslint-disable no-unused-vars */
import React, {  useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../components/Button/Button';
import { useSelector } from 'react-redux';
import { updateProfile } from 'firebase/auth';
import auth from '../utils/firebase.config';
import Container from '../components/Container/Container';


const Profile = () => {

    const [loading, setLoading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
    const navigate = useNavigate();
    const user = useSelector((state) => state.userSlice);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
      } = useForm();
      
      const handleImageChange = image =>{
        setUploadButtonText(image.name);
    }

      const onSubmit = async (data, event) => {
        try {
         
          // Image Upload
          const image = event.target.image.files[0];
          const formData = new FormData();
          formData.append('image', image);
      
          const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;
      
          // Upload the image to a remote server 
          const imageResponse = await fetch(url, {
            method: 'POST',
            body: formData,
          });
          const imageData = await imageResponse.json();
          const photoURL = imageData?.data?.display_url;
      
          
        //   setLoading(true);
          const displayName = `${data.firstName} ${data.lastName}`;
          // await updateUserProfile(displayName, imageUrl);
          await updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL,
          });
      
          // Prepare user data to be sent to the server
          const saveInfo = {
            name: displayName,
            photoURL: photoURL,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
          };
         console.log(saveInfo);
          // Send user data to the server
          const response = await fetch(`https://task-master-server-vert.vercel.app/users/${user?.email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(saveInfo),
          });
      
          if (response.ok) {
            reset(); // Reset the form
           
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User Information Updated Successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/'); 
          } else {
            // Handle any errors from the server
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong on the server!',
            });
          }
        } catch (error) {
          // Handle any Firebase or other errors
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong with Firebase Authentication!',
          });
        } finally {
          // setLoading(false);
        }
      };
      

    return (
        <Container>
           
            <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            
            <form className=" w-full p-8 space-y-12" onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-2xl font-normal'>Your Profile</h1>
    {/* name */}
    <div className="sm:flex-none md:flex gap-4">
      <div className=" flex flex-col">
        <label className="text-normal text-gray-400 " htmlFor="firstName">
          First Name
        </label>
        
     
          <input
            type="text"
            id="firstName"
            className="md:w-96 sm:w-full  rounded-md pl-8"
            {...register('firstName', { required: true })}
           
            
          />
        
      </div>
      <div className=" flex flex-col">
        <label className="text-normal text-gray-400" htmlFor="lastName">
          Last Name
        </label>
       
          
          <input
            type="text"
            id="lastName"
            className="md:w-96 sm:w-full rounded-md pl-8"
            {...register('lastName', { required: true })}
          
            
          />
        
      </div>
    </div>
    {/* email and phone number */}
    <div className="sm:flex-none md:flex gap-4">
      <div className=" flex flex-col">
        <label className="text-normal text-gray-400 " htmlFor="email">
          Email
        </label>
        
     
          <input
            type="email"
            id="email"
            className="md:w-96 sm:w-full  rounded-md pl-8"
            {...register('email', { required: true })}
            value={user?.email}
            readOnly
           
            
          />
        
      </div>
      <div className=" flex flex-col">
        <label className="text-normal text-gray-400" htmlFor="phoneNumber">
          Phone Number
        </label>
       
          
          <input
            type="number"
            id="phoneNumber"
            className="md:w-96 sm:w-full rounded-md pl-8"
            {...register('phoneNumber', { required: true })}
          
            
          />
        
      </div>
    </div>
    {/* image */}

             <div className=' p-4 bg-white w-2/3 flex flex-row justify-center items-center rounded-lg'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                    onChange={event=>{
                        handleImageChange(event.target.files[0])
                    }}
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    
                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                      {uploadButtonText}
                    
                    </div>
                  </label>
                 
                </div>
              </div>
              <img
                  className='object-cover w-24 h-24 mx-2 rounded'
                  src={user?.photoURL}
                  alt='avatar'
                  referrerPolicy='no-referrer'
                />
            </div>
    {/* address */}
    <div className="flex flex-col">
               <label  htmlFor="address" className="text-normal text-gray-400">
                   Address
               </label>
               <textarea
                   className="w-2/3  h-32 px-4 py-3  rounded-md"
                   type="text"
                   id="address"
                   {...register('address', { required: true })}
               />
           </div>

           {/* password  */}
           <div className="sm:flex-none md:flex gap-4">
      <div className=" flex flex-col">
        <label className="text-normal text-gray-400 " htmlFor="password">
          Password
        </label>
        
     
          <input
            type="password"
            id="password"
            className="md:w-96 sm:w-full  rounded-md pl-8"
            {...register('password')}
           
            
          />
        
      </div>
      <div className=" flex flex-col">
        <label className="text-normal text-gray-400" htmlFor="password">
          Confirm Password
        </label>
       
          
          <input
            type="password"
            id="ConfirmPassword"
            className="md:w-96 sm:w-full rounded-md pl-8"
            {...register('ConfirmPassword')}
          
            
          />
        
      </div>
      
    </div>
    <div className='md:w-1/4 '>
            <Button label="Save changes"/>

            
          </div>
  </form>
            </div>


        </Container>
    );
};

export default Profile;
