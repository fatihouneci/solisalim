import React, { useState, useEffect } from "react";
import { HiPause, HiPlay } from "react-icons/hi";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    console.log(url);
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <div className="p-2" onClick={toggle}>
        {playing ? (
          <div className="flex items-center border p-2 rounded-2xl cursor-pointer hover:bg-green-100">
            <HiPause className="w-8 h-8" />
            <span>Pause</span>
          </div>
        ) : (
          <div className="flex items-center border p-2 rounded-2xl cursor-pointer hover:bg-green-100">
            <HiPlay className="w-8 h-8" />
            <span>Jouer</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
