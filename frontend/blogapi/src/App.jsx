import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Posts from './components/posts';
import PostLoadingComponent from './components/postLoading';
import axiosInstance from './components/axios';

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    axiosInstance.get('/')
      .then((response) => {
        console.log(response.data, "post");
        setAppState({ loading: false, posts: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setAppState({ loading: false, posts: null });
      });
  }, []);

  return (
    <Box className="App">
      <Typography variant="h1">Latest Posts</Typography>
      <PostLoading isLoading={appState.loading} posts={appState.posts} /> {/* 注意这里是 PostLoading 而不是 postLoading */}
    </Box>
  );
}

export default App;
