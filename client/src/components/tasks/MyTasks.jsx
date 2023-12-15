import {
    CheckIcon,
    DocumentMagnifyingGlassIcon,
  } from '@heroicons/react/24/outline';
  import { useEffect, useState } from 'react';
  import TaskDetailsModal from './TaskDetailsModal';
  
  
  
  
  const MyTasks = ({searchResults}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [taskId, setTaskId] = useState(0);
  
    const handleDetails = (id) => {
      setTaskId(id);
      setIsOpen(!isOpen);
    };
   
    return (
      <div>
       
        <h1 className="text-xl my-3">Search Results</h1>
        <div className=" h-[750px] overflow-auto space-y-3">
          {searchResults?.map((item) => (
            <div
              key={item.id}
              className="bg-secondary/10 rounded-md p-3 flex justify-between"
            >
              <h1>{item.title}</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDetails(item._id)}
                  className="grid place-content-center"
                  title="Details"
                >
                  <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
                </button>
               
              </div>
              <TaskDetailsModal item={item}   isOpen={isOpen} setIsOpen={setIsOpen} taskId={taskId} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MyTasks;
  