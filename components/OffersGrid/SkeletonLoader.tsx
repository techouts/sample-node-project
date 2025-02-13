import React, { useEffect, useState } from 'react';
import { Skeleton, Box } from '@mui/material';
import { isMobile as deviceIsMobile } from 'react-device-detect';

const SkeletonLoader = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(deviceIsMobile);
  }, []);

  const itemsPerRow = isMobile ? 2 : 3;
  const skeletonHeight = isMobile ? 150 : 250;

  if (isMobile === null) return null;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
        gap: 2,
      }}
    >
      {Array.from({ length: itemsPerRow * 2 }).map((_, index) => (
        <Box
        key={index}
        sx={{
          padding: isMobile ? 0 : 1, 
        }}
      >
          <Skeleton variant="rectangular" width="100%" height={skeletonHeight} />
        </Box>
      ))}
    </Box>
  );
};

export default SkeletonLoader;