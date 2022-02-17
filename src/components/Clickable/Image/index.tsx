import { ReactElement } from 'react';
import useInView from 'react-cool-inview';

import {
  useTheme,
  useColorMode,
  useBoolean,
  Box,
  Center,
  AspectRatio,
  Image as CUIImage,
  Fade
} from '@chakra-ui/react';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { AnimatePresence } from 'framer-motion';
import { useElementSize } from 'usehooks-ts';

import { ImageProps, IconProps } from './types';

import * as fallback from '../../../common/assets/fallback';
import { handleReturnRatio } from '../../../common/utils';
import { Theme } from '../../../theme/types';

const commonStyleProps = {
  width: 'inherit',
  minWidth: 'inherit',
  maxWidth: 'inherit',
  borderRadius: 'inherit'
};

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
    ratio = handleReturnRatio('portrait'),
    renderIcon,
    isDisabled = false,
    isActive = false,
    onClick
  } = props;

  const [isHovering, setIsHovering] = useBoolean();

  const iconProps: IconProps = {
    color: colorMode === 'light' ? theme.colors.gray[50] : theme.colors.gray[900],
    fontSize: height > 375 ? theme.fontSizes['7xl'] : theme.fontSizes['6xl']
  };

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
      <AnimatePresence exitBeforeEnter initial={false}>
        {inView ? (
          <Center as={Fade} key='clickable-image-content' width='100%' in unmountOnExit style={{ ...commonStyleProps }}>
            <Box
              {...commonStyleProps}
              ref={imageRef}
              onClick={children && !isDisabled && onClick ? () => onClick() : undefined}
              onMouseEnter={children && !isDisabled ? () => setIsHovering.on() : undefined}
              onMouseLeave={children && !isDisabled ? () => setIsHovering.off() : undefined}
            >
              <AspectRatio {...commonStyleProps} ratio={ratio}>
                <>
                  {!isDisabled ? (
                    <Center
                      {...commonStyleProps}
                      position='absolute'
                      zIndex={1}
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
                        {isActive ? <CheckOutlinedIcon style={{ ...iconProps }} /> : renderIcon({ ...iconProps })}
                      </Fade>
                    </Center>
                  ) : null}

                  {children}
                </>
              </AspectRatio>
            </Box>
          </Center>
        ) : (
          <Center as={Fade} key='dummy-clickable-image' width='100%' in unmountOnExit style={{ ...commonStyleProps }}>
            <AspectRatio {...commonStyleProps} ratio={ratio}>
              <CUIImage
                {...commonStyleProps}
                alt='dummy-clickable-image'
                src={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
              />
            </AspectRatio>
          </Center>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Image;
