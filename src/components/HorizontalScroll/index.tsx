import { ReactElement } from 'react';

import { useTheme } from '@chakra-ui/react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import './common/styles/styles.css';
import { handleConvertStringToNumber } from '../../common/utils';
import { Theme } from '../../theme/types';
import Child from './components/Child';
import LeftArrow from './components/LeftArrow';
import RightArrow from './components/RightArrow';
import { HorizontalScrollProps } from './types';

const HorizontalScroll = ({ children, divider, isDisabled = false }: HorizontalScrollProps): ReactElement => {
  const theme = useTheme<Theme>();

  return (
    <ScrollMenu
      LeftArrow={<LeftArrow isDisabled={isDisabled} />}
      RightArrow={<RightArrow isDisabled={isDisabled} />}
      transitionDuration={handleConvertStringToNumber(theme.transition.duration['ultra-slow'], 'ms')}
      wrapperClassName='wrapperContainer'
      scrollContainerClassName='scrollContainer'
    >
      {children.map((child, index) => (
        <Child
          key={`child-${index}`}
          itemId={`child-${index}`}
          divider={divider}
          isLast={index === children.length - 1}
        >
          {child}
        </Child>
      ))}
    </ScrollMenu>
  );
};

export default HorizontalScroll;
