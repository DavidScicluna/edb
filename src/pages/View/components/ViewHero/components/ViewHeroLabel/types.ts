import { StackProps } from '@chakra-ui/react';

export type ViewHeroLabelProps = Omit<StackProps, 'direction' | 'alignItems' | 'justifyContent' | 'spacing'> & {
	label: string;
};
