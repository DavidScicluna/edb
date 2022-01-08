import React, { WheelEvent, ReactElement } from 'react';

import { useTheme, Box } from '@chakra-ui/react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import { handleConvertStringToNumber, handleConvertEasingsIntoNumbers } from '../../../../../common/utils';
import { Theme } from '../../../../../theme/types';
import { ScrollMenu as ScrollMenuType } from '../../types';
import Child from './components/Child';
import { ScrollProps } from './types';

// const handleTouchHandler = (e) => {

// };

const touch: any = {};

const handleIsTouchPad = (event: WheelEvent): boolean => {
  if (Math.abs(event.deltaX) !== 0 || Math.abs(event.deltaY) < 15) {
    event.stopPropagation();
    return true;
  } else {
    return false;
  }
};

const handleOnWheel = (scroll: ScrollMenuType, event: any): void => {
  if (handleIsTouchPad(event)) {
    return;
  }

  const element = event.target;

  if (element?.parentNode.id === 'sl-m') {
    if (event.type === 'touchstart') {
      touch.startX = event.changedTouches[0].screenX;
      touch.startY = event.changedTouches[0].screenY;
    } else {
      touch.endX = event.changedTouches[0].screenX;
      touch.endY = event.changedTouches[0].screenY;

      touch.lenX = Math.abs(touch.endX - touch.startX);
      touch.lenY = Math.abs(touch.endY - touch.startY);

      if (touch.lenY < 20) {
        document.body.style.overflowY = 'hidden';

        if (event.deltaY < 0) {
          scroll.scrollNext();
        } else if (event.deltaY > 0) {
          scroll.scrollPrev();
        }
      } else {
        document.body.style.overflowY = 'scroll';
      }
    }
  } else {
    document.body.style.overflowY = 'scroll';
  }
};

// const handleOnWheel = (scroll: ScrollMenuType, event: WheelEvent): void => {
//   if (Math.abs(event.deltaX) !== 0 || Math.abs(event.deltaY) < 15) {
//     event.stopPropagation();
//     return;
//   }

//   if (event.deltaY < 0) {
//     scroll.scrollNext();
//   } else if (event.deltaY > 0) {
//     scroll.scrollPrev();
//   }
// };

const Scroll = ({ children, ...rest }: ScrollProps): ReactElement => {
  const theme = useTheme<Theme>();

  return (
    <ScrollMenu
      {...rest}
      transitionDuration={handleConvertStringToNumber(theme.transition.duration['ultra-slow'], 'ms')}
      // transitionEase={(handleConvertEasingsIntoNumbers(theme.transition.easing['ease-in-out']) ) =>}
      // transitionBehavior={customAnimation ? scrollBehavior : undefined}
      onWheel={handleOnWheel}
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
