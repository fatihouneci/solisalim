import React, { useRef } from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";

const Player = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
}) => {
  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);

    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };

  return (
    <div className="absolute bottom-0 w-full mx-auto p-2">
      <div className="title">
        <p>{currentSong?.title}</p>
      </div>
      <div className="w-full my-2">
        <div
          className="min-w-full bg-gray-200 h-1 border rounded-[30px] cursor-pointer"
          onClick={checkWidth}
          ref={clickRef}
        >
          <div
            className="h-full bg-green-600 rounded-[30px]"
            style={{ width: `${currentSong?.progress + "%"}` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <BsFillSkipStartCircleFill
          className="w-6 h-6 hover:opacity-60"
          onClick={skipBack}
        />
        {isplaying ? (
          <BsFillPauseCircleFill
            className="w-10 h-10 hover:opacity-60"
            onClick={PlayPause}
          />
        ) : (
          <BsFillPlayCircleFill
            className="w-10 h-10 hover:opacity-60"
            onClick={PlayPause}
          />
        )}
        <BsFillSkipEndCircleFill
          className="w-6 h-6 hover:opacity-60"
          onClick={skiptoNext}
        />
      </div>
    </div>
  );
};

export default Player;
