import React, { ReactElement } from 'react';

import {
  useTheme,
  useColorMode,
  useBoolean,
  useBreakpointValue,
  Box,
  Center,
  AspectRatio,
  Image as CUIImage,
  Icon,
  Fade
} from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import utils from '../../../../../../common/utils/utils';
import Skeleton from '../../../../../../components/Skeleton';
import { Theme } from '../../../../../../theme/types';
import { ImageProps } from './types';

const width = ['185px', '205px', '230px'];

const Image = (props: ImageProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isHovering, setIsHovering] = useBoolean();
  const fontSize = useBreakpointValue({
    'base': theme.fontSizes['5xl'],
    'sm': theme.fontSizes['5xl'],
    'md': theme.fontSizes['6xl'],
    'lg': theme.fontSizes['6xl'],
    'xl': theme.fontSizes['7xl'],
    '2xl': theme.fontSizes['7xl']
  });

  const { image, name, isLoading = false, onClickImage } = props;

  return (
    <Box
      position='relative'
      width={width}
      minWidth={width}
      maxWidth={width}
      onClick={image ? () => onClickImage(image) : undefined}
      onMouseEnter={image ? () => setIsHovering.on() : undefined}
      onMouseLeave={image ? () => setIsHovering.off() : undefined}>
      <Center
        width={width}
        height='100%'
        position='absolute'
        zIndex={1}
        borderRadius='base'
        sx={{
          cursor: 'pointer',
          backgroundColor: isHovering
            ? colorMode === 'light'
              ? 'rgba(0, 0, 0, 0.25)'
              : 'rgba(255, 255, 255, 0.25)'
            : 'transparent',
          transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-in-out']}`
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
      <AspectRatio ratio={2 / 3}>
        <Skeleton isLoaded={!isLoading} borderRadius='base'>
          <CUIImage
            alt={`${name ? `"${name}"` : ''} image`}
            maxWidth='none'
            height='100%'
            borderRadius='base'
            src={`${process.env.REACT_APP_IMAGE_URL}/w780${image?.file_path}`}
            fallbackSrc={utils.handleReturnFallbackSrc('person', '780', `${name ? `"${name}"` : ''} image`)}
          />
        </Skeleton>
      </AspectRatio>
    </Box>
  );
};

export default Image;
