import { useState, useEffect } from 'react';
import * as gameService from '../../services/gameService';

export default function GameListPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await gameService.index();
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <h1>Post List</h1>
      {posts.length ? 
        <ul>
          {posts.map((post) => <li key={post._id}>{post.content}</li>)}
        </ul>
        :
        <p>No Posts Yet!</p>
      }
    </>
  );
}