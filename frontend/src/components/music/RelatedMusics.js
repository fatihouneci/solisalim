import React, { useEffect, useState } from "react";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import MusicCard from "./MusicCard";

const RelatedMusics = ({ tags }) => {
  const [music, setMusics] = useState([]);
  useEffect(() => {
    const fecthMusic = async () => {
      const response = await FetchWrapper.get(
        `http://localhost:2000/api/musics/tags?tags=${tags}`
      );
      if (response) {
        console.log(response);
        setMusics(response);
      }
    };
    fecthMusic();
  }, [tags]);

  return (
    <>
      {music &&
        music?.map((music, index) => (
          <MusicCard key={index} type="horizontal" music={music} />
        ))}
    </>
  );
};

export default RelatedMusics;
