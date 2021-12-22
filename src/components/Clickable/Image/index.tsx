import { ReactElement } from 'react';

import { useTheme, useColorMode, useBoolean, Box, AspectRatio, Center, Icon, Fade } from '@chakra-ui/react';
import { SearchOutlined as SearchOutlinedIcon, CheckOutlined as CheckOutlinedIcon } from '@material-ui/icons';
import useInView from 'react-cool-inview';
import { useElementSize } from 'usehooks-ts';

import { Theme } from '../../../theme/types';
import { ImageProps } from './types';

const Image = (props: ImageProps): ReactElement => {
  const [imageRef, { height }] = useElementSize();

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { observe: ref, inView } = useInView<HTMLDivElement>({
    threshold: [0.2, 0.4, 0.6, 0.8, 1],
    unobserveOnEnter: true
  });

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
      ref={ref}
      as={AspectRatio}
      width={width}
      minWidth={width}
      maxWidth={width}
      borderRadius={borderRadius}
      ratio={ratio}
    >
      <Fade in={isActive || inView} unmountOnExit style={{ width: 'inherit' }}>
        <Box
          {...rest}
          ref={imageRef}
          width='inherit'
          borderRadius={borderRadius}
          onClick={children && !isDisabled && onClick ? () => onClick() : undefined}
          onMouseEnter={children && !isDisabled ? () => setIsHovering.on() : undefined}
          onMouseLeave={children && !isDisabled ? () => setIsHovering.off() : undefined}
        >
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
                  }}
                >
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
      </Fade>
    </Box>
  );
};

export default Image;
