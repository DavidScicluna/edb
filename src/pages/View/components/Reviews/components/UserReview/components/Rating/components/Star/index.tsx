import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, Box, Icon } from '@chakra-ui/react';
import { Star as StarIcon } from 'react-feather';

import { Theme } from '../../../../../../../../../../theme/types';
import { StarProps } from './types';

const Star = ({ value, hoveringNumber, isChecked, onChange, onHover }: StarProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      cursor='pointer'
      p={isSm ? 0.5 : 1}
      onClick={() => onChange(value)}
      onMouseEnter={() => onHover(value)}
      onMouseLeave={() => onHover(0)}
      _focus={{ boxShadow: 'none' }}
      _hover={{
        transform: 'scale(1.25)',
        color: `yellow.${colorMode === 'light' ? 400 : 500}`
      }}
      sx={{
        color:
          isChecked || value < hoveringNumber
            ? `yellow.${colorMode === 'light' ? 400 : 500}`
            : colorMode === 'light'
            ? 'gray.400'
            : 'gray.500',
        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
      }}
    >
      <Icon
        // as={isChecked ? StarOutlinedIcon : StarOutlineOutlinedIcon}
        as={StarIcon}
        sx={{
          fontSize: `${isSm ? theme.fontSizes.xl : theme.fontSizes['2xl']} !important`,
          transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
        }}
      />
    </Box>
  );
};

export default Star;
