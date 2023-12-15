
import { TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../ui/Modal';

const itemDetailsModal = ({ isOpen, setIsOpen, item }) => {
  

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
      <div className="bg-secondary/10 rounded-md p-5">
      <h1
        className={`text-lg font-semibold mb-3 ${item.priority === 'high' ? 'text-red-500' : ' '
          } ${item.priority === 'medium' ? 'text-yellow-500' : ' '} ${item.priority === 'low' ? 'text-green-500' : ' '
          }`}
      >
      <span className='font-bold'>Title: </span>  {item?.title}
      </h1>
      <p className="mb-3"> <span className='font-bold'>Details:</span> {item?.description}</p>
      <p className="text-sm"><span className='font-bold'>Assigned to</span> - {item?.assignedTo}</p>
      <div className="flex justify-between mt-3">
        <p><span className='font-bold'>Date:</span> {item?.date}</p>
        <p><span className='font-bold'>Priority: </span> {item?.priority}</p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setIsOpen(false)
            }}
            title="Close"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
</svg>

          </button>

          
        </div>
      </div>
    </div>
    </Modal>
  );
};

export default itemDetailsModal;
