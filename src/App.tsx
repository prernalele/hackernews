import React, { useState } from "react";
import "./App.css";
import Topmenu from "./components/Topmenu";
import StoriesList from "./components/StoriesList";

function App() {
  const [storyIds, setStoryIds] = useState([]);

  // GETs story Ids or list of stories but just Ids
  const getStories = (prefix: string) => {
    fetch(
      `https://hacker-news.firebaseio.com/v0/${prefix}stories.json?print=pretty`
    )
      .then((ids) => ids.json())
      .then((data) => {
        console.log("data", data);
        return setStoryIds(data);
      });
  };

  return (
    <div className="App">
      <Topmenu getStories={getStories} />
      <StoriesList storyIds={storyIds} />
    </div>
  );
}

export default App;
