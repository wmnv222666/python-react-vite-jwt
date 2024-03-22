import React from 'react';
import Typography from '@mui/material/Typography';

function PostLoading(Component) {
    return function PostLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <Typography variant="body1" style={{ fontSize: '25px' }}>
                We are waiting for the data to load!...
            </Typography>
        );
    };
}

export default PostLoading;

