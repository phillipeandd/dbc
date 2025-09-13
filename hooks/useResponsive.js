import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { breakpoints } from '../theme';

export const useResponsive = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const isSmall = dimensions.width < breakpoints.medium;
  const isMedium = dimensions.width >= breakpoints.medium && dimensions.width < breakpoints.large;
  const isLarge = dimensions.width >= breakpoints.large && dimensions.width < breakpoints.xlarge;
  const isXLarge = dimensions.width >= breakpoints.xlarge;
  const isTablet = dimensions.width >= breakpoints.medium;
  const isPortrait = dimensions.height > dimensions.width;
  const isLandscape = dimensions.width > dimensions.height;

  return {
    width: dimensions.width,
    height: dimensions.height,
    isSmall,
    isMedium,
    isLarge,
    isXLarge,
    isTablet,
    isPortrait,
    isLandscape,
  };
};