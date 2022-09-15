import { FC, useCallback } from 'react';

import { useTheme, Tooltip, Skeleton, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, HStack, Center, Text } from '@chakra-ui/react';

import round from 'lodash/round';
import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../common/hooks';

import { RatingProps, MouseEvent } from './types';

const { getColor } = utils;

const Rating: FC<RatingProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [textRef, { width: textWidth }] = useElementSize();

	const {
		rating,
		count,
		inView = true,
		isLoading = false,
		onMouseEnter,
		onMouseLeave,
		spacing = 0.75,
		size = 'md',
		...rest
	} = props;

	const [isTooltipOpen, setIsTooltipOpen] = useBoolean();

	const handleMouseEnter = useCallback((event: MouseEvent) => {
		setIsTooltipOpen.on();

		if (onMouseEnter) {
			onMouseEnter(event);
		}
	}, []);

	const handleMouseLeave = useCallback((event: MouseEvent) => {
		setIsTooltipOpen.off();

		if (onMouseLeave) {
			onMouseLeave(event);
		}
	}, []);

	return (
		<Tooltip
			aria-label='Count of Ratings (tooltip)'
			colorMode={colorMode}
			label={`${count} Ratings`}
			isOpen={!!count && !isLoading && isTooltipOpen}
			placement='right'
		>
			<HStack {...rest} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} spacing={spacing}>
				<Icon
					width={`${textWidth}px`}
					height={`${textWidth}px`}
					fontSize={`${textWidth}px`}
					icon='star'
					category='outlined'
					color={getColor({ theme, colorMode, color: 'yellow', type: 'color' })}
				/>

				<Center ref={textRef}>
					<Skeleton isLoaded={inView && !isLoading} variant='text'>
						<Text
							align='left'
							fontSize={size}
							fontWeight='semibold'
							color={getColor({ theme, colorMode, type: 'text.primary' })}
							noOfLines={1}
						>
							{rating && !isLoading ? round(Number(rating), 1) : 'N/A'}
						</Text>
					</Skeleton>
				</Center>
			</HStack>
		</Tooltip>
	);
};

export default Rating;
