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
  Image,
  Icon,
  Fade
} from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import utils from '../../../../../../common/utils/utils';
import Skeleton from '../../../../../../components/Skeleton';
import { Theme } from '../../../../../../theme/types';
import { PosterProps } from './types';

const Poster = (props: PosterProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isMob] = useMediaQuery('(max-width: 640px)');
  const fontSize = useBreakpointValue({
    base: theme.fontSizes['4xl'],
    sm: theme.fontSizes['5xl'],
    md: theme.fontSizes['6xl']
  });

  const { name, path, isLoading = false, onClickPoster } = props;

  const [isHovering, setIsHovering] = useBoolean();

  return (
    <Box
      position='relative'
      width={isMob ? '100%' : '20vw'}
      border={isMob ? 'none' : '4px'}
      borderColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      borderRadius={isMob ? 'base' : 'full'}
      onClick={!isLoading && path ? () => onClickPoster(path) : undefined}
      onMouseEnter={!isLoading && path ? () => setIsHovering.on() : undefined}
      onMouseLeave={!isLoading && path ? () => setIsHovering.off() : undefined}>
      <Center
        width='100%'
        height='100%'
        position='absolute'
        zIndex={1}
        borderRadius={isMob ? 'base' : 'full'}
        sx={{
          cursor: 'pointer',
          backgroundColor: isHovering
            ? colorMode === 'light'
              ? 'rgba(0, 0, 0, 0.25)'
              : 'rgba(255, 255, 255, 0.25)'
            : 'transparent',
          transition: `${theme.transition.duration.fast} ${theme.transition.easing['ease-out']}`
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
      <AspectRatio ratio={1 / 1}>
        <Skeleton isLoaded={!isLoading} borderRadius={isMob ? 'base' : 'full'}>
          <Image
            alt={`${name ? `"${name}"` : ''} profile poster`}
            width='100%'
            src={`${process.env.REACT_APP_IMAGE_URL}/original${path}`}
            fallbackSrc={utils.handleReturnFallbackSrc('person', '780', `${name ? `"${name}"` : ''} profile poster`)}
          />
        </Skeleton>
      </AspectRatio>
    </Box>
  );
};

export default Poster;
