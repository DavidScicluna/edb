import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';


import Arrow from './components/Arrow';
import { ActionsProps } from './types';

const Actions = ({ isLeftDisabled, isRightDisabled, onLeftClick, onRightClick }: ActionsProps): ReactElement => {
  return (
    <HStack spacing={1.5}>
      <Arrow direction='left' isDisabled={isLeftDisabled} onClick={onLeftClick} />
      <Arrow direction='right' isDisabled={isRightDisabled} onClick={onRightClick} />
    </HStack>
  );
};

export default Actions;
