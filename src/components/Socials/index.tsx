import { ReactElement } from 'react';

import { useMediaQuery, Stack } from '@chakra-ui/react';


import Links from './components/Links';
import { SocialsProps } from './types';

const Socials = (props: SocialsProps): ReactElement => {
  const [isMd] = useMediaQuery('(max-width: 768px)');

  const { orientation: orientationProp = 'vertical', ...rest } = props;

  const orientation = isMd ? 'horizontal' : orientationProp;

  return (
    <Stack direction={orientation === 'vertical' ? 'column' : 'row'} spacing={0}>
      <Links {...rest} />
    </Stack>
  );
};

export default Socials;
