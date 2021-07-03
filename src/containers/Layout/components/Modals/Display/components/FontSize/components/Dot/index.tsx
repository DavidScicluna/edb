import React, { ReactElement } from 'react';

import { useTheme, Box } from '@chakra-ui/react';

import Tooltip from '../../../../../../../../../components/Tooltip';
import { Theme } from '../../../../../../../../../theme/types';
import { Form } from '../../../../types';

export type DotProps = {
  label: string;
  color: Form['color'];
  isActive?: boolean;
  isSmaller?: boolean;
};

const Dot = ({ label, color, isActive = false, isSmaller = false }: DotProps): ReactElement => {
  const theme = useTheme<Theme>();

  return (
    <Tooltip label={label} placement='top' closeOnClick={false} closeOnMouseDown={false} span>
      <Box
        position='relative'
        zIndex={1000}
        width={theme.fontSizes[isActive ? 'xl' : 'lg']}
        height={theme.fontSizes[isActive ? 'xl' : 'lg']}
        backgroundColor={`${color}.${isActive || isSmaller ? 400 : 100}`}
        borderRadius='full'
        sx={{ transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}` }}
      />
    </Tooltip>
  );
};

export default Dot;
