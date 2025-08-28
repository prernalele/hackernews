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

  const storiesClickHandler = () => {
    const param = topSelected ? "top" : "new";
    getStories(param);
    setTopSelected(!topSelected);
  };
  return (
    <div className="container">
      <h1 className="title">Welcome to HackerNews</h1>
      <div className="menuholder">
        <h2
          className={topSelected ? "selectedStyle" : "defaultTabStyle"}
          onClick={storiesClickHandler}
        >
          Top Stories
        </h2>
        <h2
          className={topSelected ? "defaultTabStyle" : "selectedStyle"}
          onClick={storiesClickHandler}
        >
          New Stories
        </h2>
      </div>
    </div>
  );
};

export default Topmenu;
