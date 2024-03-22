import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Posts from './components/Posts';
import PostLoadingComponent from './components/PostLoading';

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://127.0.0.1:8000/api/`;
    fetch(apiUrl)
      .then((data) => data.json())
      .then((posts) => {
        // console.log(posts,"post");
        setAppState({ loading: false, posts: posts });
      });
  }, []);

  return (
    <Box className="App">
      <Typography variant="h1">Latest Posts</Typography>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </Box>
  );
}

export default App;

