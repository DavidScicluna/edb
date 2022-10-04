import { FC, useCallback } from 'react';

import { useTheme, Skeleton, DummyButton, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, VStack, Center, Text } from '@chakra-ui/react';

import { compact, isEmpty, isNil } from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { UserDetailsProps } from './types';

const { getColor, convertREMToPixels, convertStringToNumber } = utils;

const UserDetails: FC<UserDetailsProps> = ({ color, colorMode, firstName, lastName, username }) => {
	const theme = useTheme();
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const [buttonRef, { width: buttonWidth }] = useElementSize();

	const hasUsername = !(isNil(username) || isEmpty(username));
	const hasFirstName = !(isNil(firstName) || isEmpty(firstName));
	const hasLastName = !(isNil(lastName) || isEmpty(lastName));

	const handleConvertSpacing = useCallback((spacing: string): number => {
		return convertREMToPixels(convertStringToNumber(spacing, 'rem'));
	}, []);

	return (
		<Stack
			width='100%'
			direction={['column', 'column', 'row']}
			alignItems={['flex-start', 'flex-start', 'center']}
			justifyContent='space-between'
			spacing={[4, 4, 6, 6]}
			px={[2, 2, 4, 4]}
			py={[2, 2, 8, 8]}
		>
			<VStack
				width={['100%', '100%', `calc(100% - ${buttonWidth + handleConvertSpacing(theme.space[6])}px)`]}
				alignItems='flex-start'
				spacing={1}
			>
				<Skeleton colorMode={colorMode} isLoaded={hasFirstName || hasLastName} speed={-1} variant='text'>
					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.primary' })}
						fontSize='4xl'
						fontWeight='semibold'
						noOfLines={0.5}
					>
						{!hasFirstName && !hasLastName
							? 'User Full Name'
							: compact([hasFirstName ? firstName : null, hasLastName ? lastName : null]).join(' ')}
					</Text>
				</Skeleton>
				<Skeleton colorMode={colorMode} isLoaded={hasUsername} speed={-1} variant='text'>
					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.secondary' })}
						fontSize='md'
						fontWeight='medium'
						noOfLines={1}
					>
						{hasUsername ? `@${username}` : '@username'}
					</Text>
				</Skeleton>
			</VStack>

			<Center ref={buttonRef} width={!isMd ? '100%' : 'auto'}>
				<DummyButton color={color} colorMode={colorMode} hasLeft isFullWidth variant='outlined' speed={-1}>
					Edit
				</DummyButton>
			</Center>
		</Stack>
	);
};

export default UserDetails;
