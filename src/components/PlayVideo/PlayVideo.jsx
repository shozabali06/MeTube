import React, { useState, useEffect } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY } from "../../data";
import { valueConverter } from "../../view-converter";
import moment from "moment";
import { useParams } from "react-router-dom";


import NProgress from "nprogress";
import "nprogress/nprogress.css";


const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, limit = 200) => {
    if (text.length > limit) {
      return `${text.substring(0, limit)}...`;
    }
    return text;
  };

  const fetchVideoData = async () => {
    try {
      NProgress.start(); // Start progress bar
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetails_url);
      const data = await response.json();
      setApiData(data.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      NProgress.done(); // End progress bar
    }
  };

  const fetchChannelData = async () => {
    if (!apiData || !apiData.snippet.channelId) return;

    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url)
      .then((response) => response.json())
      .then((data) => setChannelData(data.items[0]));

    const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&order=relevance&key=${API_KEY}`;
    await fetch(comment_url)
      .then((response) => response.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchChannelData();
    }
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video controls autoPlay muted src={video1}></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? valueConverter(apiData.statistics.viewCount) : "16K"} views
          &bull;{" "}
          {apiData?.snippet?.publishedAt
            ? moment(apiData.snippet.publishedAt).fromNow()
            : "Unknown Date"}
        </p>
        <div>
          <span>
            <img src={like} />
            {apiData ? valueConverter(apiData.statistics.likeCount) : ""}
          </span>
          <span>
            <img src={dislike} />
          </span>
          <span>
            <img src={share} />
            Share
          </span>
          <span>
            <img src={save} />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Channel Name"}</p>
          <span>
            {valueConverter(
              channelData ? channelData.statistics.subscriberCount : ""
            )}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        {apiData?.snippet?.description ? (
          <>
            {/* Conditionally render description based on isExpanded */}
            <p>
              {isExpanded
                ? apiData.snippet.description // Full description when expanded
                : truncateText(apiData.snippet.description)}{" "}
              {/* Truncated description when collapsed */}
            </p>
            {apiData.snippet.description.length > 200 && (
              <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </>
        ) : (
          <p>No description available</p>
        )}
        <hr />
        <h4>
          {apiData ? valueConverter(apiData.statistics.commentCount) : "No"}
          Comments
        </h4>
        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>1 day ago</span>
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.snippet.topLevelComment.snippet.textDisplay,
                  }}
                />
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {valueConverter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
