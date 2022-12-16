import React, { useEffect, useRef, useState } from "react";

import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay, FaPause } from "react-icons/fa";

import Audio from "http:/localhost:2000/audio/miatayni.mp3";

const AudioPlayer = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  };

  return (
    <div className="fixed left-[100px] right-[100px] z-50 bottom-2 h-[60px]">
      <div className="w-[700px] lg:w-full bg-black text-white flex justify-center items-center mx-auto h-full rounded-full">
        <audio
          ref={audioPlayer}
          type="audio/mpeg"
          src="http://localhost:2000/audio/miatayni.mp3"
        />
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center justify-center space-x-2"
            onClick={backThirty}
          >
            <BsArrowLeftShort /> 30
          </button>
          <button
            className="flex items-center justify-center p-4 border rounded-full"
            onClick={togglePlayPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay className="" />}
          </button>
          <button
            className="flex items-center justify-center space-x-2"
            onClick={forwardThirty}
          >
            30 <BsArrowRightShort />
          </button>
        </div>

        <div className="flex items-center justify-between space-x-2 ml-4">
          {/* current time */}
          <div className="">{calculateTime(currentTime)}</div>

          {/* progress bar */}
          <div>
            <input
              type="range"
              className=""
              defaultValue="0"
              ref={progressBar}
              onChange={changeRange}
            />
          </div>

          {/* duration */}
          <div className="">{calculateTime(duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
