import React, { ReactElement } from 'react';

import { useTheme, Center } from '@chakra-ui/react';

import { Theme } from '../../../../theme/types';
import { ChildProps } from './types';

const Child = ({ children, renderDivider, isLast = false }: ChildProps): ReactElement => {
  const theme = useTheme<Theme>();

  return (
    <Center wrap='nowrap'>
      {children}

      {renderDivider && !isLast ? (
        <Center p={0} m={0}>
          {renderDivider({ padding: theme.space['0.75'] })}
        </Center>
      ) : null}
    </Center>
  );
};

export default Child;
