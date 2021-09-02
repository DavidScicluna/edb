import React, { ReactElement } from 'react';

import {
  useTheme,
  useColorMode,
  useMediaQuery,
  useBreakpointValue,
  useBoolean,
  Box,
  Center,
  AspectRatio,
  Icon,
  Fade
} from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import Image from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { Theme } from '../../../../../../theme/types';
import { PosterProps } from './types';

const Poster = (props: PosterProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const fontSize = useBreakpointValue({
    'base': theme.fontSizes['6xl'],
    'sm': theme.fontSizes['4xl'],
    'md': theme.fontSizes['5xl'],
    'lg': theme.fontSizes['5xl'],
    'xl': theme.fontSizes['6xl'],
    '2xl': theme.fontSizes['6xl']
  });

  const { name, path, isLoading = false, isError = false, onClickPoster } = props;

  const [isHovering, setIsHovering] = useBoolean();
  const [isImageError, setIsImageError] = useBoolean();

  return (
    <Box
      position='relative'
      width={isSm ? '100%' : ['125px', '125px', '175px', '225px', '275px', '325px']}
      border={isSm ? 'none' : '4px'}
      borderColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      borderRadius={isSm ? 'base' : 'full'}
      onClick={!isLoading && !isError && !isImageError && path ? () => onClickPoster(path) : undefined}
      onMouseEnter={!isLoading && !isError && !isImageError && path ? () => setIsHovering.on() : undefined}
      onMouseLeave={!isLoading && !isError && !isImageError && path ? () => setIsHovering.off() : undefined}>
      <AspectRatio ratio={1 / 1}>
        <>
          <Fade in={!isImageError} unmountOnExit>
            <Center
              width='100%'
              height='100%'
              position='absolute'
              zIndex={1}
              borderRadius={isSm ? 'base' : 'full'}
              sx={{
                cursor: 'pointer',
                backgroundColor: isHovering
                  ? colorMode === 'light'
                    ? 'rgba(0, 0, 0, 0.25)'
                    : 'rgba(255, 255, 255, 0.25)'
                  : 'transparent',
                transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
              }}>
              <Fade in={isHovering} unmountOnExit>
                <Icon
                  as={SearchOutlinedIcon}
                  color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
                  sx={{
                    fontSize: `${fontSize} !important`
                  }}
                />
              </Fade>
            </Center>
          </Fade>
          <Skeleton isLoaded={!isLoading} borderRadius={isSm ? 'base' : 'full'}>
            <Image
              width='100%'
              alt={`${name ? `"${name}"` : ''} profile poster`}
              mediaType='person'
              onError={() => setIsImageError.on()}
              onLoad={() => setIsImageError.off()}
              src={path || ''}
              size={{
                thumbnail: 'w45',
                full: 'original'
              }}
            />
          </Skeleton>
        </>
      </AspectRatio>
    </Box>
  );
};

export default Poster;
