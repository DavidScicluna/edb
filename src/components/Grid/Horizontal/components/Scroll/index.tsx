import { ReactElement } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import { useTheme } from '@chakra-ui/react';

import Child from './components/Child';
import { ScrollProps } from './types';

import { handleConvertStringToNumber } from '../../../../../common/utils';
import { Theme } from '../../../../../theme/types';

const Scroll = ({ children, ...rest }: ScrollProps): ReactElement => {
  const theme = useTheme<Theme>();

  return (
    <ScrollMenu
      {...rest}
      transitionDuration={handleConvertStringToNumber(theme.transition.duration['ultra-slow'], 'ms')}
    >
      {children.map((child, index) => (
        <Child key={`child-${index}`} itemId={`child-${index}`} isLast={index === children.length - 1}>
          {child}
        </Child>
      ))}
    </ScrollMenu>
  );
};

export default Scroll;
