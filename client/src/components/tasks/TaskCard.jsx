/* eslint-disable no-unused-vars */
import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteTaskMutation, useUpdateStatusMutation } from '../../redux/features/api/baseApi';


const TaskCard = ({ task }) => {
  // const dispatch = useDispatch();
  const [updateTask, { data, error }] = useUpdateStatusMutation();
  const [removeTask, { data: info, error: err }] = useDeleteTaskMutation();
  // console.log(data);
  // console.log(error);
  // console.log(info);
  // console.log(err);
  const handleUpdate = (id, updatedStatus) => {

    const data = {
      status: updatedStatus,
    };
    const options = {
      id: id,
      data: data,
    }
    updateTask(options)
  }

  let updatedStatus;

  if (task.status === 'pending') {
    updatedStatus = 'running';
  } else if (task.status === 'running') {
    updatedStatus = 'done';
  } else {
    updatedStatus = 'archive';
  }
  return (
    <div className="bg-secondary/10 rounded-md p-5">
      <h1
        className={`text-lg font-semibold mb-3 ${task.priority === 'high' ? 'text-red-500' : ' '
          } ${task.priority === 'medium' ? 'text-yellow-500' : ' '} ${task.priority === 'low' ? 'text-green-500' : ' '
          }`}
      >
        {task?.title}
      </h1>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.assignedTo}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.date}</p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              console.log('Deleting task:', task);
              task._id && removeTask(task._id);
            }}
            title="Delete"
          >
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>

          <button
            onClick={() =>
              // updateTask({ id: task._id, data: {status: updatedStatus} })

              handleUpdate(task._id, updatedStatus)
            }
            title="Update Status"
          >
            <ArrowRightIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
