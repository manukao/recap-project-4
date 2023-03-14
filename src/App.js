import React, { useState, useRef, useEffect } from "react";
import Form from "./components/form/form.js";
import List from "./components/list/list.js";
import { uid } from "uid";

function App() {
  const [activities, setActivities] = useState([]);
  const nameInputRef = useRef(null);
  const [weather, setWeather] = useState(null);
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);

  const weatherAPIs = [
    "https://example-apis.vercel.app/api/weather/sahara",
    "https://example-apis.vercel.app/api/weather/rainforest",
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(weatherAPIs[currentWeatherIndex]);
      const data = await response.json();
      setWeather(data);
    };

    fetchWeather();

    const intervalId = setInterval(() => {
      setCurrentWeatherIndex(
        (prevIndex) => (prevIndex + 1) % weatherAPIs.length
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentWeatherIndex]);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const handleAddActivity = (activity, isGoodWeather) => {
    const newActivity = {
      id: uid(),
      name: activity,
      isForGoodWeather: isGoodWeather,
    };
    setActivities((prevActivities) => [...prevActivities, newActivity]);
    nameInputRef.current.focus();
  };

  const handleDeleteActivity = (id) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === weather?.isGoodWeather
  );

  return (
    <div>
      <h1>
        {weather?.condition} - {weather?.temperature}&deg;C
      </h1>
      <Form onAddActivity={handleAddActivity} nameInputRef={nameInputRef} />
      <List
        activities={filteredActivities}
        isGoodWeather={weather?.isGoodWeather}
        onDeleteActivity={handleDeleteActivity}
      />
    </div>
  );
}

export default App;
