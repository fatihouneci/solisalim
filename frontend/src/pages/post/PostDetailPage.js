import {
  ThumbUpIcon,
  ChatIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Comments from "../../components/comment/Comments";
import Player from "../../components/Player";
import RelatedPosts from "../../components/Posts/RelatedPosts";
import { GET_POSTS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { formatToDate } from "../../core/helpers/utility";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";

const PostDetailPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [post, setPost] = useState({});
  let [words, setWords] = useState([]);
  let [wordIdx, setWordIdx] = useState(0);

  const auth = useSelector((state) => state.auth);

  const utterance = useRef(new SpeechSynthesisUtterance());
  const docRef = useRef();

  const { slug } = useParams();

  useEffect(async () => {
    const response = await FetchWrapper.get(`${GET_POSTS}slug/${slug}`);
    setPost(response);
  }, [slug]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!auth.user) {
      alert("Veuillez créer un compte utilisateur");
      return false;
    }
    const response = await FetchWrapper.post(
      `${GET_POSTS}like/${post._id}`,
      {}
    );
    if (response) {
      setPost(response.data);
    }
  };

  const updateComments = (response) => {
    setPost(response);
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const play = () => {
    utterance.current.text = getText(post.content);
    // const utterThis = new SpeechSynthesisUtterance(getText(post.content));
    window.speechSynthesis.speak(utterance.current);
    words = getText(post.content).split(" ");
    wordIdx = 0;
    setIsPlaying(true);
    highlightWord();
  };
  const pause = () => {
    setIsPaused(true);
    window.speechSynthesis.pause();
  };
  const resume = () => {
    setIsPaused(false);
    window.speechSynthesis.resume();
  };
  const stop = () => {
    setIsPaused(false);
    setIsPlaying(false);
    window.speechSynthesis.cancel();
    //docRef.current.innerHTML = getText(post.content);
  };

  const highlightWord = () => {
    utterance.current.onboundary = function (event) {
      var e = docRef.current;
      e.innerHTML = e.innerHTML.replace(
        words[wordIdx],
        "<strong>" + words[wordIdx] + "</strong>"
      );
      wordIdx++;
    };
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex space-x-5">
        <div className="flex-[3]">
          <div className="flex items-center justify-between my-[40px]">
            <div className="flex items-center space-x-2 text-gray-500">
              <span>{post?.views} vues, </span>
              <span>publié le {formatToDate(post?.createdAt)}</span>
              <div className="flex items-center space-x-2">
                {!isPlaying && (
                  <button onClick={play} className="flex items-center">
                    <PlayIcon className="w-6 h-6 text-green-600" />
                    <span className="text-xs text-green-600">Lecture</span>
                  </button>
                )}
                {isPlaying && !isPaused && (
                  <button onClick={pause} className="flex items-center">
                    <PauseIcon className="w-6 h-6 text-green-600" />
                    <span className="text-xs text-green-600">Pause</span>
                  </button>
                )}
                {isPlaying && isPaused && (
                  <button onClick={resume} className="flex items-center">
                    <PlayIcon className="w-6 h-6 text-green-600" />
                    <span className="text-xs text-green-600">Reprendre</span>
                  </button>
                )}
                {isPlaying && (
                  <button onClick={stop} className="flex items-center">
                    <StopIcon className="w-6 h-6 text-orange-600" />
                    <span className="text-xs text-orange-600">Arrêter</span>
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-5 text-gray-500">
              <button
                onClick={handleLike}
                className="flex items-center space-x-1 text-gray-900"
              >
                <ThumbUpIcon className="w-6 h-6" />
                <span>{post?.likes?.length}</span>
              </button>
              <div className="flex items-center space-x-1 text-gray-900">
                <ChatIcon className="w-6 h-6" />
                <span>{post?.comments?.length}</span>
              </div>
            </div>
          </div>
          <div className="my-[40px]">
            <h1 className="text-2xl text-gray-800 font-semibold">
              {post?.title}
            </h1>
            <p className="text-gray-500">{post?.description}</p>
          </div>

          <div className="w-full">
            <div className="">
              <img
                className="w-full h-[400px] border rounded-md object-cover"
                src={post?.coverPicture}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              {post?.audioUri && (
                <div>
                  <Player url={post?.audioUri} />
                </div>
              )}
            </div>

            <div className="my-[40px]" ref={docRef}>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post?.content),
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-[1] sticky top-0 h-screen border-l">
          <Comments
            postId={post?._id}
            comments={post?.comments}
            updateComments={updateComments}
          />
          <RelatedPosts />
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
