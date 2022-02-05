import { ReactElement } from 'react';

import { useTheme, useColorMode, Center, ScaleFade } from '@chakra-ui/react';
import {
  ChevronLeftOutlined as ChevronLeftOutlinedIcon,
  ChevronRightOutlined as ChevronRightOutlinedIcon
} from '@material-ui/icons';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { Theme } from '../../../../theme/types';
import IconButton from '../../../Clickable/IconButton';
import useStyles from './styles';
import { ArrowProps } from './types';

const Arrow = (props: ArrowProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { direction, isDisabled = false, onClick } = props;

  const style = useStyles(theme, { isDisabled });

  const [ref, { width, height }] = useElementSize<HTMLButtonElement>();

  return (
    <Center
      width={`${width * 2}px`}
      minHeight={`${height}px`}
      height='100%'
      position='absolute'
      left={direction === 'left' ? 0 : undefined}
      right={direction === 'right' ? 0 : undefined}
      zIndex={1}
      // backgroundColor={!isDisabled ? (colorMode === 'light' ? 'gray.50' : 'gray.900') : 'transparent'}
      sx={{ ..._.merge({ top: '50%', transform: 'translateY(-50%)' }, style[colorMode][direction]) }}
      _after={
        direction === 'left'
          ? {
              ..._.merge(
                { ...style.arrow, width, minHeight: `${height}px`, height: '100%' },
                style[colorMode][direction]
              )
            }
          : undefined
      }
      _before={
        direction === 'right'
          ? {
              ..._.merge(
                { ...style.arrow, width, minHeight: `${height}px`, height: '100%' },
                style[colorMode][direction]
              )
            }
          : undefined
      }
    >
      <ScaleFade in={!isDisabled} unmountOnExit>
        <IconButton ref={ref} aria-label={`Scroll ${direction}`} onClick={() => onClick()} size='sm' variant='icon'>
          {direction === 'left' ? <ChevronLeftOutlinedIcon /> : <ChevronRightOutlinedIcon />}
        </IconButton>
      </ScaleFade>
    </Center>
  );
};

export default Arrow;
