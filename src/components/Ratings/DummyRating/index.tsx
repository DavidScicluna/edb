import { FC } from 'react';

import { useTheme, Skeleton, Icon, utils } from '@davidscicluna/component-library';

import { HStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../common/hooks';

import { DummyRatingProps } from './types';

const { getColor } = utils;

const DummyRating: FC<DummyRatingProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [textRef, { width: textWidth }] = useElementSize();

	const { spacing = 0.75, size = 'md', ...rest } = props;

	return (
		<HStack {...rest} spacing={spacing}>
			<Icon
				width={`${textWidth}px`}
				height={`${textWidth}px`}
				fontSize={`${textWidth}px`}
				icon='star'
				category='outlined'
				color={getColor({ theme, colorMode, color: 'yellow', type: 'color' })}
			/>

			<Center ref={textRef}>
				<Skeleton isLoaded={false} variant='text'>
					<Text align='left' fontSize={size} fontWeight='semibold'>
						N/A
					</Text>
				</Skeleton>
			</Center>
		</HStack>
	);
};

export default DummyRating;
