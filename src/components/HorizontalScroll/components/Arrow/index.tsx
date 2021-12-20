import { ReactElement, useEffect } from 'react';

import { useTheme, useColorMode, useBoolean, Center, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'react-feather';
import { useInterval } from 'usehooks-ts';

import { Theme } from '../../../../theme/types';
import IconButton from '../../../Clickable/IconButton';
import useStyles from './styles';
import { ArrowProps, Event } from './types';

const Arrow = (props: ArrowProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const style = useStyles(theme, props);

  const { direction, isDisabled = false, reset = false, onScrollClick } = props;

  const [isMouseDown, setIsMouseDown] = useBoolean();

  const handleOnClick = (event: Event): void => {
    event.preventDefault();

    onScrollClick(direction);
  };

  const handleIsMouseDown = (event: Event): void => {
    event.preventDefault();

    if (event.button === 0) {
      setIsMouseDown.on();
    } else {
      setIsMouseDown.off();
    }
  };

  const handleIsMouseUp = (event: Event): void => {
    event.preventDefault();

    setIsMouseDown.off();
  };

  useInterval(() => onScrollClick(direction), isMouseDown ? 25 : null);

  useEffect(() => {
    if (reset || isDisabled) {
      setIsMouseDown.off();
    }
  }, [reset, isDisabled]);

  return (
    <Center
      width='auto'
      height='100%'
      position='absolute'
      left={direction === 'left' ? 0 : undefined}
      right={direction === 'right' ? 0 : undefined}
      zIndex={1}
      backgroundColor='transparent'
      _after={direction === 'left' ? { ..._.merge(style.arrow, style[colorMode][direction]) } : undefined}
      _before={direction === 'right' ? { ..._.merge(style.arrow, style[colorMode][direction]) } : undefined}
    >
      <ScaleFade in={!isDisabled} unmountOnExit style={{ height: '100%' }}>
        <Center height='100%' backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
          <IconButton
            aria-label={`Scroll ${direction}`}
            icon={direction === 'left' ? ChevronLeftIcon : ChevronRightIcon}
            onClick={(event: Event) => handleOnClick(event)}
            onMouseDown={(event: Event) => handleIsMouseDown(event)}
            onMouseUp={(event: Event) => handleIsMouseUp(event)}
            size='sm'
            variant='icon'
          />
        </Center>
      </ScaleFade>
    </Center>
  );
};

export default Arrow;
