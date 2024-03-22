import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Posts = (props) => {
    const { posts } = props;

    if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {posts.map((post) => (
                        <Grid item key={post.id} xs={12} md={4}>
                            <Card>
                                {post.image && (
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={post.image} // 使用后端提供的图片链接
                                        alt={post.title}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {post.title.substr(0, 50)}...
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {post.excerpt.substr(0, 60)}...
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Posts;
