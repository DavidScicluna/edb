import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Box, Icon } from '@chakra-ui/react';
import { StarOutlineOutlined as StarOutlineOutlinedIcon, StarOutlined as StarOutlinedIcon } from '@material-ui/icons';

import { Theme } from '../../../../../../../../../../theme/types';
import { StarProps } from './types';

const Star = ({ value, hoveringNumber, isChecked, onChange, onHover }: StarProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  return (
    <Box
      cursor='pointer'
      p={1}
      onClick={() => onChange(value)}
      onMouseEnter={() => onHover(value)}
      onMouseLeave={() => onHover(0)}
      _hover={{
        transform: 'scale(1.25)',
        color: `yellow.${colorMode === 'light' ? 400 : 500}`
      }}
      _focus={{
        boxShadow: 'none'
      }}
      sx={{
        color:
          isChecked || value < hoveringNumber
            ? `yellow.${colorMode === 'light' ? 400 : 500}`
            : colorMode === 'light'
            ? 'gray.400'
            : 'gray.500',
        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
      }}>
      <Icon
        as={isChecked ? StarOutlinedIcon : StarOutlineOutlinedIcon}
        sx={{
          transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
        }}
      />
    </Box>
  );
};

export default Star;
