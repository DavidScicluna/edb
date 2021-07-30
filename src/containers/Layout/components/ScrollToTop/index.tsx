import React, { ReactElement, useState, useCallback, useEffect } from 'react';

import { useTheme, Box, ScaleFade } from '@chakra-ui/react';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import utils from '../../../../common/utils/utils';
import IconButton from '../../../../components/Clickable/IconButton';
import Tooltip from '../../../../components/Tooltip';
import { Theme } from '../../../../theme/types';

const ScrollToTop = (): ReactElement => {
  const theme = useTheme<Theme>();

  const color = useSelector((state) => state.user.ui.theme.color);

  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const handleScroll = useCallback(
    () => setScrollHeight(document?.scrollingElement?.scrollTop || 0),
    [document, setScrollHeight]
  );

  useEffect(() => {
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
      <ScaleFade in={scrollHeight > screen.height} unmountOnExit>
        <Tooltip aria-label='Scroll to top' label='Scroll to the top' placement='left'>
          <IconButton
            aria-label='Scroll to top'
            color={utils.handleReturnColor(color)}
            icon={ArrowUpwardOutlinedIcon}
            onClick={() => document.scrollingElement?.scrollTo(0, 0)}
          />
        </Tooltip>
      </ScaleFade>
    </Box>
  );
};

export default ScrollToTop;
