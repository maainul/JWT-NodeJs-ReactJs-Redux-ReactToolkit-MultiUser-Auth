import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postSlice";

const PostView = () => {
  const { posts, isLoading, error } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      {isLoading && <h3>Loading .....</h3>}
      {error && <h3>{error.message}</h3>}
      <ul>{posts && posts.map((post) => <li>{post.title}</li>)}</ul>
    </>
  );
};

export default PostView;
