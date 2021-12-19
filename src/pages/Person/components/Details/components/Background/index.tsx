import { ReactElement } from 'react';

import { useTheme, useColorMode, Box } from '@chakra-ui/react';

import { handleReturnBoringSrc } from '../../../../../../common/utils';
import { Theme } from '../../../../../../theme/types';
import { BackgroundProps } from './types';

const Background = ({ children, alt }: BackgroundProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  return (
    <Box
      width='100%'
      height={['150px', '150px', '200px', '250px', '300px', '350px']}
      position='relative'
      borderRadius='md'
      sx={{
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundImage: `url(${handleReturnBoringSrc('pixel', colorMode === 'light' ? 500 : 400, alt)})`
      }}
    >
      <Box position='absolute' top={theme.space[2]} right={theme.space[2]}>
        {children.socials}
      </Box>
      <Box
        position='absolute'
        bottom={['-37.5px', '-37.5px', '-50px', '-62.5px', '-75px', '-87.5px']}
        left={['37.5px', '37.5px', '50px', '62.5px', '75px', '87.5px']}
      >
        {children.poster}
      </Box>
    </Box>
  );
};

export default Background;
