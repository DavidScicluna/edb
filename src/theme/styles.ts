import { mode, Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: (props) => ({
    'body': {
      fontFamily: 'body',
      color: mode('gray.900', 'gray.50')(props),
      bg: mode('white', 'black')(props),
      transition: 'background-color 0.2s',
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
