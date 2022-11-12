import { FC, useCallback } from 'react';

import { Space, useTheme, Card, CardBody, Icon, utils } from '@davidscicluna/component-library';

import { HStack, VStack, Text, Center } from '@chakra-ui/react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import compact from 'lodash/compact';
import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../../../common/hooks';

import { ListProps } from './types';

dayjs.extend(relativeTime);

const { convertREMToPixels, convertStringToNumber } = utils;

const spacing: Space = 2;

const List: FC<ListProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [iconRef, { width: iconWidth }] = useElementSize();

	const { list, isSelected = false, onClick } = props;
	const { id, label, description, mediaItems, createdAt, updatedAt } = list;

	const handleContentWidth = useCallback(() => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${iconWidth + spacingWidth}px)`;
	}, [theme, spacing, iconWidth]);

	return (
		<Card
			color={isSelected ? color : 'gray'}
			colorMode={colorMode}
			isClickable
			isFullWidth
			isLight={false}
			onClick={() => onClick({ id, isSelected })}
			px={2}
			py={1}
		>
			<CardBody>
				<HStack width='100%' justifyContent='space-between' spacing={2}>
					<Center ref={iconRef}>
						<Icon
							colorMode={colorMode}
							width={theme.fontSizes['3xl']}
							height={theme.fontSizes['3xl']}
							fontSize={theme.fontSizes['3xl']}
							icon={isSelected ? 'check_box' : 'check_box_outline_blank'}
							category='filled'
							skeletonColor={isSelected ? color : 'gray'}
						/>
					</Center>

					<VStack width={handleContentWidth()} alignItems='flex-start' spacing={0}>
						<Text align='left' fontSize='xl' fontWeight='semibold' textTransform='capitalize' noOfLines={1}>
							{label}
						</Text>

						{description && (
							<Text
								align='left'
								fontSize='sm'
								fontWeight='normal'
								textTransform='capitalize'
								noOfLines={1}
							>
								{description}
							</Text>
						)}

						<Text align='left' fontSize='xs' fontWeight='normal' textTransform='capitalize' noOfLines={1}>
							{compact([
								mediaItems.movie.length + mediaItems.tv.length > 0
									? `Total of ${mediaItems.movie.length + mediaItems.tv.length} items`
									: null,
								createdAt ? `Created ${dayjs(createdAt).fromNow()}` : null,
								mediaItems.movie.length + mediaItems.tv.length > 0 && updatedAt
									? `Updated ${dayjs(updatedAt).fromNow()}`
									: null
							]).join(' • ')}
						</Text>
					</VStack>
				</HStack>
			</CardBody>
		</Card>
	);
};

export default List;
