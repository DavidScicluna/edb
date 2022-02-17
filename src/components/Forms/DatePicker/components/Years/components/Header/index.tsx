import { ReactElement } from 'react';

import { useColorMode, HStack, Text, Fade } from '@chakra-ui/react';
import {
  ChevronLeftOutlined as ChevronLeftOutlinedIcon,
  ChevronRightOutlined as ChevronRightOutlinedIcon
} from '@material-ui/icons';
import _ from 'lodash';

import IconButton from '../../../../../../Clickable/IconButton';
import years from '../../../../common/data/years';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { currentYears, index, minDate, maxDate, onNavigateClick } = props;

  return (
    <HStack width='100%' justifyContent='space-between' spacing={2}>
      {/* Back Button */}
      <IconButton
        aria-label={`Go to ${''} month`}
        isDisabled={minDate ? currentYears.some((year) => year === 1900 || year < minDate.getFullYear()) : false}
        onClick={() => onNavigateClick('back')}
        size='lg'
        variant='icon'
      >
        <ChevronLeftOutlinedIcon />
      </IconButton>

      {/* Current Decade */}
      <Fade in={!_.isNil(index)} unmountOnExit>
        <Text
          align='center'
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          fontSize='md'
          fontWeight='semibold'
        >
          {index ? `${years[index][0]} - ${years[index][years[index].length - 1]}` : 'N/A'}
        </Text>
      </Fade>

      {/* Forward Button */}
      <IconButton
        aria-label={`Go to ${''} month`}
        isDisabled={maxDate ? currentYears.some((year) => year === 2099 || year > maxDate.getFullYear()) : false}
        onClick={() => onNavigateClick('forward')}
        size='lg'
        variant='icon'
      >
        <ChevronRightOutlinedIcon />
      </IconButton>
    </HStack>
  );
};

export default Header;
