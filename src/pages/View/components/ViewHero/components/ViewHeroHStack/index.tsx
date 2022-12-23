import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import ViewHeroText from '../ViewHeroText';

import { ViewHeroHStackProps } from './types';

const ViewHeroHStack: FC<ViewHeroHStackProps> = ({ children, ...rest }) => {
	return (
		<HStack {...rest} width='100%' divider={<ViewHeroText mr={0.75}>,</ViewHeroText>} flexWrap='wrap' spacing={0}>
			{children}
		</HStack>
	);
};

export default ViewHeroHStack;
