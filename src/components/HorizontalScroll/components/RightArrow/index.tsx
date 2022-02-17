import { ReactElement, useContext, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import Arrow from '../Arrow';
import { RightArrowProps } from './types';

const RightArrow = ({ isDisabled: isDisabledProp = false }: RightArrowProps): ReactElement => {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = useContext(VisibilityContext);

  const [isDisabled, setIsDisabled] = useBoolean(!visibleItemsWithoutSeparators.length && isLastItemVisible);

  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      if (isLastItemVisible) {
        setIsDisabled.on();
      } else {
        setIsDisabled.off();
      }
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return <Arrow direction='right' isDisabled={isDisabledProp || isDisabled} onClick={() => scrollNext()} />;
};

export default RightArrow;
