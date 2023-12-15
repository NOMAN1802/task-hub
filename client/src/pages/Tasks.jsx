/* eslint-disable no-unused-vars */
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import MyTasks from '../components/tasks/MyTasks';
import TaskCard from '../components/tasks/TaskCard';
import AddTaskModal from '../components/tasks/AddTaskModal';
import { useRef, useState } from 'react';
import MenuDropdown from '../components/ui/MenuDropdown';
import { useGetTasksQuery } from '../redux/store';
import { useSearchTasksQuery } from '../redux/features/api/baseApi';
import { searchTasks } from '../redux/features/tasks/tasksSlice';
import { useSelector } from 'react-redux';
import Container from '../components/Container/Container';
import Trusted from '../components/Trusted';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [sortOrder, setSortOrder] = useState("asc");

  const [priority, setPriority] = useState("all");

  const { data: tasks } = useGetTasksQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const { isLoading, isError, error, email, name, photoURL } = useSelector((state) => state.userSlice || {});
  const { data: searchResults, error: searchError } = useSearchTasksQuery(searchText);
  const handleSearch = () => {
    searchTasks(searchText);
  }

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const convertToDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };


  const pendingTasks = tasks
    ?.filter((task) => task.status.toLowerCase() === "pending" && (priority === "all" || task.priority === priority))
    .filter((task) => task.date && convertToDate(task.date))
    .sort((a, b) => {
      const dateA = convertToDate(a.date);
      const dateB = convertToDate(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const doneTasks = tasks
    ?.filter((task) => task.status.toLowerCase() === "done" && (priority === "all" || task.priority === priority))
    .filter((task) => task.date && convertToDate(task.date))
    .sort((a, b) => {
      const dateA = convertToDate(a.date);
      const dateB = convertToDate(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const runningTasks = tasks
    ?.filter((task) => task.status.toLowerCase() === "running" && (priority === "all" || task.priority === priority))
    .filter((task) => task.date && convertToDate(task.date))
    .sort((a, b) => {
      const dateA = convertToDate(a.date);
      const dateB = convertToDate(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <Container>
      <AddTaskModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="h-screen sm:grid-none md:grid md:grid-cols-12 ">
        <div className="col-span-10  p-10">


          <div className="flex justify-between items-center">
            <div>
              {/* <h1 className="font-semibold text-3xl">Tasks</h1> */}
              <Link to="/" className="navbar-brand ">
                <img className="w-36 rounded-md" src="/logo.png" alt="" />
              </Link>
            </div>
            {/* search button */}
            <div className="flex gap-5">

              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                className="w-1/2 rounded-md py-2 "
              />{" "}

              <button onClick={handleSearch} className="border-2 border-secondary/10 hover:border-primary hover:bg-primary rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>


              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
                <BellIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-primary"
              >
                Add Task
              </button>
              <span className='m-auto text-pink-400 transition hover:border-pink-500 cursor-pointer font-medium whitespace-nowrap'>
                {name}
              </span>

              <MenuDropdown key={email}>
                <div className="h-10 w-10 rounded-xl overflow-hidden">
                  <img
                    src={photoURL}
                    alt=""
                    className="object-cover h-full w-full "
                  />

                </div>
              </MenuDropdown>

            </div>
          </div>
          {/* filter start */}

          <div className="flex justify-between items-center">
            <div>
              <div className="flex gap-3">
              <h1 className="text-xl text-center">Tasks</h1>
              </div>
            </div>
            <div>
              <select value={priority} onChange={handlePriorityChange}>
                <option value="all">All Tasks</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high"> High</option>
              </select>
            </div>

          </div>

          {/* filter end */}

          <div className="grid grid-cols-3 gap-5 mt-8">
            <div className="">
              <div className="flex  justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                <h1>Up Next</h1>
                <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                  {pendingTasks?.length}
                </p>
              </div>
              <div className="space-y-3">
                {pendingTasks?.map((item) => (
                  <TaskCard key={item.id} task={item} />
                ))}
              </div>
            </div>
            <div className="">
              <div className="flex justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                <h1>In Progress</h1>
                <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                  {runningTasks?.length}
                </p>
              </div>
              <div className="space-y-3">
                {runningTasks?.map((item) => (
                  <TaskCard key={item.id} task={item} />
                ))}
              </div>
            </div>
            <div className="">
              <div className="flex  justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                <h1>Up Next</h1>
                <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                  {doneTasks?.length}
                </p>
              </div>
              <div className="space-y-3">
                {doneTasks?.map((item) => (
                  <TaskCard key={item.id} task={item} />
                ))}
              </div>
            </div>
          </div>
          <Trusted />

        </div>
        <div className="col-span-2  border-secondary/20 px-10 pt-10">
          <div>
            <h1 className="text-xl">Members</h1>
            <div className="flex gap-3 mt-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
            </div>
          </div>
          <MyTasks searchResults={searchResults} />

        </div>

      </div>
    </Container>
  );
};

export default Tasks;
