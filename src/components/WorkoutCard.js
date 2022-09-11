import { formatDistanceToNow } from "date-fns";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutCard = ({ workout }) => {
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) return;
    alert(`Delete id: ${workout._id}`);
  };

  return (
    <div className='relative bg-white rounded-xl px-3 py-1.5'>
      <p className='text-xl font-semibold'>{workout.title}</p>
      <p>Reps: {workout.reps}</p>
      <p>Load: {workout.load}</p>
      <p className='text-sm text-gray-500'>
        {formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
        })}
      </p>
      <div className='flex gap-1 absolute right-0 top-0'>
        <button className='bg-yellow-300 text-white p-1'>
          <FiEdit />
        </button>
        <button onClick={handleDelete} className='bg-red-500 text-white p-1'>
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
