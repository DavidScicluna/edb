import { ReactElement, useState, useCallback, useEffect } from 'react';

import { useTheme, useBoolean, Box, SlideFade } from '@chakra-ui/react';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import _ from 'lodash';

import { useSelector, useWindowSize } from '../../../../common/hooks';
import { handleReturnColor } from '../../../../common/utils';
import IconButton from '../../../../components/Clickable/IconButton';
import Tooltip from '../../../../components/Tooltip';
import { Theme } from '../../../../theme/types';

const ScrollToTop = (): ReactElement => {
  const theme = useTheme<Theme>();

  const { height } = useWindowSize();

  const color = useSelector((state) => state.user.ui.theme.color);

  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const [isHovering, setIsHovering] = useBoolean();

  const handleScroll = useCallback(
    _.debounce(() => {
      const scroll = document?.scrollingElement?.scrollTop || 0;

      if (scroll <= height) {
        setIsHovering.off();
      }

      setScrollHeight(scroll);
    }, 250),
    [document, setScrollHeight]
  );

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      position='fixed'
      bottom={theme.space[2]}
      right={theme.space[2]}
      borderRadius='lg'
      boxShadow='lg'
      backgroundColor='transparent'>
      <SlideFade in={scrollHeight > screen.height} unmountOnExit offsetY={theme.space[2]}>
        <Tooltip aria-label='Scroll to top' label='Scroll to the top' placement='left' isOpen={isHovering} gutter={6}>
          <IconButton
            aria-label='Scroll to top'
            color={handleReturnColor(color)}
            icon={ArrowUpwardOutlinedIcon}
            onClick={() => document.scrollingElement?.scrollTo(0, 0)}
            onMouseEnter={() => setIsHovering.on()}
            onMouseLeave={() => setIsHovering.off()}
          />
        </Tooltip>
      </SlideFade>
    </Box>
  );
};

export default ScrollToTop;
