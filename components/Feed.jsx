"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (searchedText) => {
    const regex = new RegExp(searchedText, "i");

    const filteredPosts = posts.filter(
      (element) =>
        element.tag === searchedText ||
        element.creator.username === searchedText ||
        regex.test(element.prompt)
    );
    setSearchResult(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or text"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResult}
          handleTagClick={(tag) => {
            setSearchText(tag);
            handleSearch(tag);
          }}
        />
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={(tag) => {
            setSearchText(tag);
            handleSearch(tag);
          }}
        />
      )}
    </section>
  );
};

export default Feed;
