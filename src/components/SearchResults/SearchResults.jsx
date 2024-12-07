import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../data";
import "../SearchResults/SearchResults.css";
import { Link } from "react-router-dom";
import { valueConverter } from "../../view-converter";
import moment from "moment";
import NProgress from "nprogress";

const SearchResults = () => {
  const searchQuery = useParams().query;
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchSearchResults = async () => {
    NProgress.start();

    try {
      const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=48&q=${searchQuery}&key=${API_KEY}`;
      const searchResponse = await fetch(searchUrl);

      if (!searchResponse.ok) {
        throw new Error(`HTTP error! Status: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();

      // Extract video IDs from the search results
      const videoIds = searchData.items
        .map((item) => item.id.videoId)
        .join(",");

      // Fetch video details (including view counts) using the videos API
      const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`;
      const videoDetailsResponse = await fetch(videoDetailsUrl);

      if (!videoDetailsResponse.ok) {
        throw new Error(`HTTP error! Status: ${videoDetailsResponse.status}`);
      }

      const videoDetailsData = await videoDetailsResponse.json();

      // Merge video details (including view counts) with search results
      const mergedData = searchData.items.map((item, index) => ({
        ...item,
        viewCount:
          videoDetailsData.items[index]?.statistics?.viewCount || "N/A",
      }));

      setData(mergedData);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError(error.message);
    } finally {
      NProgress.done();
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="container large-container">
      {error && <p className="error-message">{error}</p>}
      <div className="feed">
        {data.map((item, index) => (
          <Link
            to={`video/${item.snippet.categoryId || "0"}/${item.id.videoId}`}
            key={index}
            className="card"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="thumbnail" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {valueConverter(item.viewCount)} views &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
