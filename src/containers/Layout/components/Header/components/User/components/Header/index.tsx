import React, { ReactElement } from 'react';

import { useColorMode, HStack, VStack, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import Avatar from '../../../../../../../../components/Avatar';

import { HeaderProps } from './types';


const Header = ({ avatar_path, name, username }: HeaderProps): ReactElement => {
	const { colorMode } = useColorMode();

	const [ref, { width }] = useElementSize();

	return (
		<HStack width='100%'>
			<Avatar ref={ref} alt={name} borderRadius='base' src={avatar_path || ''} />
			<VStack width={`calc(100% - ${width}px)`} alignItems='flex-start' spacing={0}>
				<Text
					align='left'
					color={`gray.${colorMode === 'light' ? 900 : 50}`}
					fontSize='xl'
					fontWeight='bold'
					lineHeight='normal'
					isTruncated
					overflow='hidden'
					whiteSpace='nowrap'
				>
					{name}
				</Text>
				<Text
					align='left'
					color={`gray.${colorMode === 'light' ? 400 : 500}`}
					fontSize='sm'
					isTruncated
					overflow='hidden'
					whiteSpace='nowrap'
				>
					{`@${username}`}
				</Text>
			</VStack>
		</HStack>
	);
};

export default Header;
