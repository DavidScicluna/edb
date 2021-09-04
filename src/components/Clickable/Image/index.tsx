import React, { ReactElement } from 'react';

import {
  useTheme,
  useColorMode,
  useBreakpointValue,
  useBoolean,
  Box,
  AspectRatio,
  Center,
  Icon,
  Fade
} from '@chakra-ui/react';
import { SearchOutlined as SearchOutlinedIcon, CheckOutlined as CheckOutlinedIcon } from '@material-ui/icons';

import { Theme } from '../../../theme/types';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const fontSize = useBreakpointValue({
    'base': theme.fontSizes['5xl'],
    'sm': theme.fontSizes['5xl'],
    'md': theme.fontSizes['6xl'],
    'lg': theme.fontSizes['6xl'],
    'xl': theme.fontSizes['7xl'],
    '2xl': theme.fontSizes['7xl']
  });

  const {
    children,
    width = '100%',
    borderRadius = 'base',
    ratio = 2 / 3,
    isDisabled = false,
    isActive = false,
    onClick,
    ...rest
  } = props;

  const [isHovering, setIsHovering] = useBoolean();

  return (
    <Box
      {...rest}
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
                <Icon
                  as={isActive ? CheckOutlinedIcon : SearchOutlinedIcon}
                  color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
                  sx={{
                    fontSize: `${fontSize} !important`
                  }}
                />
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
