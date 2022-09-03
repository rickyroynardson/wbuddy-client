import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

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
      <div className="border-2 p-4">
        {workouts &&
          workouts.map((workout) => (
            <div className="bg-white">
              <p>{workout.title}</p>
              <p>{workout.reps}</p>
              <p>{workout.load}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
