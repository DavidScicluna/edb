import { StackProps } from '@chakra-ui/react';

export type ViewHeroVStackProps = Omit<StackProps, 'direction' | 'alignItems' | 'justifyContent' | 'spacing'>;
