import React, { ReactElement, useRef } from 'react';

import { useTheme, useColorMode, useBoolean, Box, AspectRatio, Center, Icon, Fade } from '@chakra-ui/react';
import { SearchOutlined as SearchOutlinedIcon, CheckOutlined as CheckOutlinedIcon } from '@material-ui/icons';

import { useElementSize } from '../../../common/hooks';
import { Theme } from '../../../theme/types';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { height } = useElementSize(imageRef);

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const {
    children,
    width = '100%',
    borderRadius = 'base',
    ratio = 2 / 3,
    icon,
    isDisabled = false,
    isActive = false,
    onClick,
    ...rest
  } = props;

  const [isHovering, setIsHovering] = useBoolean();

  return (
    <Box
      {...rest}
      ref={imageRef}
      position='relative'
      width={width}
      minWidth={width}
      maxWidth={width}
      borderRadius={borderRadius}
      onClick={children && !isDisabled && onClick ? () => onClick() : undefined}
      onMouseEnter={children && !isDisabled ? () => setIsHovering.on() : undefined}
      onMouseLeave={children && !isDisabled ? () => setIsHovering.off() : undefined}>
      <AspectRatio ratio={ratio}>
        <>
          <Fade in={!isDisabled} unmountOnExit style={{ width: '100%', height: '100%' }}>
            <Center
              width='100%'
              height='100%'
              position='absolute'
              zIndex={1}
              borderRadius={borderRadius}
              sx={{
                cursor: 'pointer',
                backgroundColor:
                  isHovering || isActive
                    ? colorMode === 'light'
                      ? 'rgba(0, 0, 0, 0.4)'
                      : 'rgba(255, 255, 255, 0.2)'
                    : 'transparent',
                transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-in-out']}`
              }}>
              <Fade in={isHovering || isActive} unmountOnExit>
                {
                  <Icon
                    as={isActive ? CheckOutlinedIcon : icon || SearchOutlinedIcon}
                    color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
                    sx={{
                      fontSize: `${height > 375 ? theme.fontSizes['7xl'] : theme.fontSizes['6xl']} !important`
                    }}
                  />
                }
              </Fade>
            </Center>
          </Fade>

          {children}
        </>
      </AspectRatio>
    </Box>
  );
};

export default Image;
