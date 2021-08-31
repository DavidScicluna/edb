import React, { ReactElement } from 'react';

import {
  useTheme,
  useColorMode,
  useBoolean,
  useBreakpointValue,
  Box,
  Center,
  AspectRatio,
  Icon,
  Fade
} from '@chakra-ui/react';
import { SearchOutlined as SearchOutlinedIcon, CheckOutlined as CheckOutlinedIcon } from '@material-ui/icons';

import Image from '../../../../../../../../components/Image';
import { Theme } from '../../../../../../../../theme/types';
import { ImageProps } from './types';

const GalleryImage = (props: ImageProps): ReactElement => {
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

  const { image, index, name, isActive = false, onClickImage } = props;

  return (
    <Box
      width='100%'
      height='100%'
      position='relative'
      onClick={() => onClickImage(index)}
      onMouseEnter={() => setIsHovering.on()}
      onMouseLeave={() => setIsHovering.off()}>
      <AspectRatio borderRadius='base' ratio={1 / 1}>
        <>
          <Center
            width='100%'
            height='100%'
            position='absolute'
            zIndex={1}
            borderRadius='base'
            sx={{
              cursor: 'pointer',
              backgroundColor:
                isHovering || isActive
                  ? colorMode === 'light'
                    ? 'rgba(0, 0, 0, 0.25)'
                    : 'rgba(255, 255, 255, 0.25)'
                  : 'transparent',
              transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
            }}>
            <Fade in={isHovering || isActive} unmountOnExit>
              <Icon
                as={isActive ? CheckOutlinedIcon : SearchOutlinedIcon}
                color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
                sx={{
                  fontSize: `${fontSize} !important`
                }}
              />
            </Fade>
          </Center>
          <Image
            alt={`${name ? `"${name}"` : ''} image`}
            maxWidth='none'
            height='100%'
            borderRadius='base'
            mediaType='person'
            src={image.file_path}
            size={{
              thumbnail: 'w45',
              full: 'original'
            }}
          />
        </>
      </AspectRatio>
    </Box>
  );
};

export default GalleryImage;
