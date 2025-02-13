import React, { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { isMobile as deviceIsMobile } from 'react-device-detect';

const ItemSkeleton: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(deviceIsMobile);
  }, []);

  if (isMobile === null) {
    return null;
  }

  const skeletonCount = isMobile ? 4 : 6;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: isMobile ? 1 : 2,
        justifyContent: 'space-between',
      }}
    >
      {[...Array(skeletonCount)].map((_, index) => (
        <Box
          key={index}
          sx={{
            flex: `1 1 ${isMobile ? '22%' : '15%'}`, 
            maxWidth: isMobile ? '22%' : '15%',
            padding: 1,
            backgroundColor: '#f0f0f0',
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: 0,
              paddingBottom: '100%', 
              borderRadius: 2,
              marginBottom: 1,
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              width: '80%',
              height: isMobile ? 10 : 20,
              marginTop: 1,
              marginBottom: 0.5,
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ItemSkeleton;
