import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

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
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div>
      <h3>Dashboard</h3>
      <div className="p-4 grid gap-3">
        {workouts &&
          workouts.map((workout) => (
            <div className="bg-white rounded-xl px-3 py-1.5">
              <p className="text-xl font-semibold">{workout.title}</p>
              <p>Reps: {workout.reps}</p>
              <p>Load: {workout.load}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(workout.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
