import { mode, Styles } from '@chakra-ui/theme-tools';

import transition from './foundations/transition';

const styles: Styles = {
  global: (props) => ({
    'body': {
      fontFamily: 'body',
      color: mode('gray.900', 'gray.50')(props),
      bg: mode('gray.50', 'gray.900')(props),
      transition: `${transition.duration.slower} ${transition.easing['ease-in-out']}`,
      lineHeight: 'base'
    },
    '*::placeholder': {
      color: mode('gray.400', 'gray.500')(props)
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'gray.700')(props),
      wordWrap: 'break-word'
    }
  })
};

export default styles;
