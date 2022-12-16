import { HeartIcon, ReplyIcon, ThumbUpIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { MdOutlineAddTask } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Comments from "../components/comment/Comments";
import RelatedVideos from "../components/video/RelatedVideos";
import VideoCard from "../components/video/VideoCard";
import { GET_VIDEOS } from "../constants/apiEndpoints";
import { FetchWrapper } from "../core/helpers/FetchWrapper";
import { formatTimeAgo } from "../core/helpers/utility";

const VideoDetailsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const videoId = useParams().id;
  const [isOwner, setIsOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await FetchWrapper.get(`${GET_VIDEOS}${videoId}`);
      if (response) {
        setVideo(response);
        if (response.userId === user.profile._id) {
          setIsOwner(true);
        }

        if (user.profile.isAdmin) {
          setIsAdmin(true);
        }
      }
    };
    fetchVideo();
  }, [videoId]);

  const handleLike = async (e) => {
    e.preventDefault();
    const response = await FetchWrapper.post(
      `${GET_VIDEOS}like/${videoId}`,
      {}
    );
    if (response) {
      console.log(response);
      setVideo(response.data);
    }
  };

  return (
    <div className="relative bg-white overflow-hidden px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex my-5 space-x-5">
          <div className="w-full pb-10 lg:w-8/12 lg:mx-auto">
            <div>
              <iframe
                width="100%"
                height="400"
                src={video?.videoUrl}
                sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                title="YouTube"
                frameborder="0"
                allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>

            <div className="px-4">
              <div className="mt-4 mb-2">
                <h1 className="text-2xl text-gray-800 font-semibold">
                  {video?.title}
                </h1>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-500">
                  <span>{video?.views} vues</span>
                  <span>{formatTimeAgo(video?.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-5 text-gray-500">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-1 text-gray-900"
                  >
                    <HeartIcon className="w-6 h-6" />
                    <span>{video?.likes.length}</span>
                  </button>
                  {(isAdmin || isOwner) && (
                    <div>
                      <Link to={`/videos/edit/${video._id}`}>Modifier</Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Comments */}
              <Comments videoId={videoId} />
            </div>
          </div>
          <div className="hidden lg:block lg:w-4/12">
            <RelatedVideos tags={video?._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsPage;
