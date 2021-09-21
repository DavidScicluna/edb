import { ReactElement } from 'react';

import { useMediaQuery, HStack, VStack } from '@chakra-ui/react';

import Links from './components/Links';
import { SocialsProps } from './types';

const Socials = (props: SocialsProps): ReactElement => {
  const [isMd] = useMediaQuery('(max-width: 768px)');
  const { orientation: orientationProp = 'vertical', ...rest } = props;

  const orientation = isMd ? 'horizontal' : orientationProp;

  return orientation === 'vertical' ? (
    <VStack spacing={0}>
      <Links {...rest} />
    </VStack>
  ) : (
    <HStack width='100%' spacing={0}>
      <Links {...rest} />
    </HStack>
  );
};

export default Socials;
