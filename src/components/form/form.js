import React, { useState } from "react";

function Form({ onAddActivity }) {
  const [activity, setActivity] = useState("");
  const [isGoodWeather, setIsGoodWeather] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddActivity(activity, isGoodWeather);
    setActivity("");
    setIsGoodWeather(false);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Activity</h2>
      <div>
        <label htmlFor="activity">Name of Activity:</label>
        <input
          type="text"
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="good-weather">Good Weather Activity:</label>
        <input
          type="checkbox"
          id="good-weather"
          checked={isGoodWeather}
          onChange={(e) => setIsGoodWeather(e.target.checked)}
        />
      </div>
      <button type="submit">Add Activity</button>
    </form>
  );
}

export default Form;
