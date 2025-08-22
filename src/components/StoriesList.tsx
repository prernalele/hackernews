import React, { useEffect, useState } from "react";
import "./StoriesList.css";

interface NewInterface {
  storyIds: string[];
}

interface DetailsObjInterface {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

const StoriesList = ({ storyIds }: NewInterface) => {
  const [stories, setStories] = useState<DetailsObjInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getStoryDetails = (storyId: string): Promise<DetailsObjInterface> => {
    // const detailsAll: detailsObjInterface =
    return fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((details) => {
        console.log("details", details);
        return details;
      })
      .catch((error) => {
        console.log("error", error);
        throw new Error(`HTTP: Error ! status`);
      });
  };

  useEffect(() => {
    if (storyIds.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    // create an array of promises. One promise for each story
    const storyPromises = storyIds.map((storyId) => getStoryDetails(storyId));
    Promise.all(storyPromises)
      .then((storiesData) => {
        setStories(storiesData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error ? error.message : "An error occured");
        setLoading(false);
      });
  }, [storyIds]);

  if (loading) {
    return <div>Loading stories ....</div>;
  }

  if (error) {
    return <div>Error loading stories: ${error} </div>;
  }

  return (
    <div>
      {stories.map((story) => {
        const { id, title, by,time,kids, descendants, url } = story;
        console.log("kids", kids)
        return (
          <div key={id} className="story">
            {url ? (
              <a href={url}>
                <h4>{title}</h4>
              </a>
            ) : (
              <h4>{title}</h4>
            )}
            <div>By {by}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StoriesList;
