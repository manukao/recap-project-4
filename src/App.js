import React, { useState, useRef } from "react";
import Form from "./components/form/form.js";
import { uid } from "uid";

function App() {
  const [activities, setActivities] = useState([]);
  const nameInputRef = useRef(null);

  const handleAddActivity = (activity, isGoodWeather) => {
    const newActivity = {
      id: uid(),
      activity,
      isGoodWeather,
    };
    setActivities([...activities, newActivity]);
    console.log(newActivity);
    nameInputRef.current.focus();
  };

  return (
    <div>
      <Form onAddActivity={handleAddActivity} nameInputRef={nameInputRef} />
      <ul>
        {activities.map(({ id, activity, isGoodWeather }) => (
          <li key={id}>
            {activity} - {isGoodWeather ? "Good Weather" : "Bad Weather"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
