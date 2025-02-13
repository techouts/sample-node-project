import React from 'react';
import { Box, Skeleton } from '@mui/material';

interface MediaBoxSkeletonProps {
  isVideo?: boolean;
}

const MediaBoxSkeleton: React.FC<MediaBoxSkeletonProps> = ({ isVideo }) => {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        paddingTop: '56.25%', 
        backgroundColor: '#f0f0f0', 
      }}
    >
      {isVideo ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
    </Box>
  );
};

export default MediaBoxSkeleton;
