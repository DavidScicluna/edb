import { FC } from 'react';

import { useTheme, Skeleton, DummyButton, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, VStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';

import { DummyUserDetailsProps } from './types';

const { convertREMToPixels, convertStringToNumber } = utils;

const DummyUserDetails: FC<DummyUserDetailsProps> = ({ color = defaultColor, colorMode = defaultColorMode }) => {
	const theme = useTheme();
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const [buttonRef, { width: buttonWidth }] = useElementSize();

	const handleConvertSpacing = (spacing: string): number => {
		return convertREMToPixels(convertStringToNumber(spacing, 'rem'));
	};

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
				spacing={0}
			>
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text align='left' fontSize='4xl' fontWeight='semibold' noOfLines={1}>
						User Full Name
					</Text>
				</Skeleton>
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text align='left' fontSize='md' fontWeight='medium' noOfLines={1}>
						Username
					</Text>
				</Skeleton>
			</VStack>

			<Center ref={buttonRef} width={!isMd ? '100%' : 'auto'}>
				<DummyButton color={color} colorMode={colorMode} hasLeft isFullWidth variant='outlined'>
					Edit
				</DummyButton>
			</Center>
		</Stack>
	);
};

export default DummyUserDetails;
