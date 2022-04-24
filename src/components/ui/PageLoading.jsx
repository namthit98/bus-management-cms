import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

const PageLoading = () => {
  return (
    <LinearProgress
      color="secondary"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 10000,
      }}
    />
  );
};

export default PageLoading;
