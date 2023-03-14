import React, { useEffect, useState } from "react";

function List({ activities, isGoodWeather, onDeleteActivity }) {
  const [storedActivities, setStoredActivities] = useState([]);

  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem("activities"));
    if (storedActivities) {
      setStoredActivities(storedActivities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(storedActivities));
  }, [storedActivities]);

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  const handleDeleteClick = (id) => {
    onDeleteActivity(id);
  };

  return (
    <div>
      <h2>
        {isGoodWeather ? "Good Weather Activities" : "Bad Weather Activities"}
      </h2>
      <ul>
        {filteredActivities.map((activity) => (
          <li key={activity.id}>
            {activity.name} -{" "}
            {activity.isForGoodWeather ? "Good Weather" : "Bad Weather"}{" "}
            <button onClick={() => handleDeleteClick(activity.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
