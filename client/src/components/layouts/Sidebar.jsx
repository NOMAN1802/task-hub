/* eslint-disable no-unused-vars */
import {
    SquaresPlusIcon,
    Cog6ToothIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    UserCircleIcon,
    ArchiveBoxIcon,
  } from '@heroicons/react/24/solid';
  import { AiOutlineLogout } from 'react-icons/ai'
  
  import logo from '../../assets/image/logo.png';
  import { Link, NavLink } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import { logout } from '../../redux/features/user/userSlice';
  
  const Sidebar = () => {
    const dispatch = useDispatch();
    const {isLoading,isError,error,email} = useSelector((state)=>state.userSlice) ;
    const handleLogout = ({ email}) => {
      dispatch(logout({
        email,
  
      }))
      console.log( email);
    };
    return (
      <div className="h-screen sticky top-0 border-r-2 border-secondary/20">
        <div className="flex flex-col items-center gap-5 h-full py-5">
          
          <Link to="./"><img src={logo} alt="logo" /></Link>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'p-2 rounded-2xl bg-primary text-white cursor-pointer'
                : 'p-2 rounded-2xl group hover:bg-primary text-secondary/40 cursor-pointer transition-all'
            }
          >
            <SquaresPlusIcon className="h-7 w-7 group-hover:text-white" />
          </NavLink>
          <NavLink
            to="/archive"
            className={({ isActive }) =>
              isActive
                ? 'p-2 rounded-2xl bg-primary text-white cursor-pointer'
                : 'p-2 rounded-2xl group hover:bg-primary text-secondary/40 cursor-pointer transition-all'
            }
          >
            <ArchiveBoxIcon className="h-7 w-7 group-hover:text-white" />
          </NavLink>
          
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'p-2 rounded-2xl bg-primary text-white cursor-pointer'
                : 'p-2 rounded-2xl group hover:bg-primary text-secondary/40 cursor-pointer transition-all'
            }
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
  
          </NavLink> 
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? 'p-2 rounded-2xl bg-primary text-white cursor-pointer mt-auto'
                : 'p-2 rounded-2xl group hover:bg-primary text-secondary/40 cursor-pointer transition-all  mt-auto'
            }
          >
            <UserCircleIcon className="h-7 w-7 group-hover:text-white " />
          </NavLink>
          <button onClick={()=> handleLogout(email)}  className='btn btn-outline btn-sm border-b border-sky-200 hover:border-yellow-200'><AiOutlineLogout></AiOutlineLogout> </button>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  