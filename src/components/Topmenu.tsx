import React, { useEffect, useState } from "react";
import "./Topmenu.css";

interface TopmenuProps {
  getStories(prefix: string): void;
}

const Topmenu: React.FC<TopmenuProps> = ({ getStories }) => {
  const [topSelected, setTopSelected] = useState(true);
  useEffect(() => {
    getStories("top");
  }, []);

  const newStoriesClickHandler = () => {
    getStories("new");
    setTopSelected(false);
  };
  return (
    <div className="container">
      <h1 className="title">Welcome to HackerNews</h1>
      <div className="menuholder">
        <h2 className={topSelected ? "selectedStyle" : "defaultTabStyle"}>
          Top Stories
        </h2>
        <h2
          className={topSelected ? "defaultTabStyle" : "selectedStyle"}
          onClick={newStoriesClickHandler}
        >
          News
        </h2>
      </div>
    </div>
  );
};

export default Topmenu;
