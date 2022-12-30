import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import ViewHeroText from '../ViewHeroText';

import { ViewHeroHStackProps } from './types';

const ViewHeroHStack: FC<ViewHeroHStackProps> = ({ children, hasDivider = true, ...rest }) => {
	return (
		<HStack
			{...rest}
			width='100%'
			divider={hasDivider ? <ViewHeroText mr={0.75}>,</ViewHeroText> : undefined}
			flexWrap='wrap'
			spacing={hasDivider ? 0 : 0.75}
		>
			{children}
		</HStack>
	);
};

export default ViewHeroHStack;
