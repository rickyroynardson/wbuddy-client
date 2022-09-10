import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";
import { FiEdit, FiTrash, FiX } from "react-icons/fi";

const Dashboard = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in!");
      return;
    }
    const workout = { title, reps, load };
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/api/workout`,
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      dispatch({ type: "CREATE_WORKOUTS", payload: json });
      setTitle("");
      setReps("");
      setLoad("");
      setError(null);
      setEmptyFields([]);
      setCreateModal(false);
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/workout`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      dispatch({ type: "SET_WORKOUTS", payload: null });
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div>
      <div className='p-4 flex items-center justify-between'>
        <h3 className='text-xl'>Dashboard</h3>
        <button
          className='bg-sky-600 px-2 py-1 rounded text-sm text-white'
          onClick={() => setCreateModal(true)}
        >
          Create
        </button>
      </div>
      <div className='px-4 grid gap-3'>
        {workouts &&
          workouts.map((workout) => (
            <div
              key={workout._id}
              className='relative bg-white rounded-xl px-3 py-1.5'
            >
              <p className='text-xl font-semibold'>{workout.title}</p>
              <p>Reps: {workout.reps}</p>
              <p>Load: {workout.load}</p>
              <p className='text-sm text-gray-500'>
                {formatDistanceToNow(new Date(workout.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <div className='flex gap-1 absolute right-0 top-0'>
                <button>
                  <FiEdit />
                </button>
                <button>
                  <FiTrash />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div
        className={`${
          createModal ? "grid place-items-center" : "invisible"
        } bg-black bg-opacity-10 fixed top-0 left-0 w-full h-full px-8`}
      >
        <div className='bg-white w-full p-3 rounded-xl'>
          <div className='flex justify-between items-center'>
            <h4>Create</h4>
            <button
              onClick={() => setCreateModal(false)}
              className='bg-gray-200 h-6 w-6 grid place-items-center rounded-full'
            >
              <FiX />
            </button>
          </div>
          <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleCreate}>
              <div>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='reps'>Reps</label>
                <input
                  type='text'
                  id='reps'
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='load'>Load</label>
                <input
                  type='text'
                  id='load'
                  value={load}
                  onChange={(e) => setLoad(e.target.value)}
                />
              </div>
              <button type='submit' className='bg-blue-500'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
