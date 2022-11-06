import { FC } from 'react';

import { useTheme, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { sort } from 'fast-sort';
import numbro from 'numbro';

import { useSelector, useUserTheme } from '../../../../../../../../../../../common/hooks';
import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridScroll,
	HorizontalGridFooter,
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	PersonVerticalPoster
} from '../../../../../../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../../../../../../common/utils';

import { OverviewTabLikedPeopleProps } from './types';

// TODO: Extract vertical poster widths into method
export const width = ['185px', '205px', '230px'];

const limit = 20;

const OverviewTabLikedPeople: FC<OverviewTabLikedPeopleProps> = ({ onTabChange }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const people = useSelector((state) => state.users.data.activeUser.data.liked.person || []);
	const total = people.length;

	return (
		<HorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<HorizontalGridHeader
				renderTitle={(props) => (
					<Text {...props}>{`Liked ${formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })}`}</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`A list containing the most popular ${formatMediaTypeLabel({
							type: total === 1 ? 'single' : 'multiple',
							mediaType: 'person'
						})} that you have liked`}
					</Text>
				)}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>

			<HorizontalGridBody>
				{total === 0 ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyIcon
								renderIcon={(props) => (
									<Icon
										{...props}
										width={theme.fontSizes['6xl']}
										height={theme.fontSizes['6xl']}
										fontSize={theme.fontSizes['6xl']}
										icon='favorite_border'
									/>
								)}
								p={2}
							/>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{`Unfortunately couldn't find any ${formatMediaTypeLabel({
										type: 'multiple',
										mediaType: 'person'
									})} in the liked list! Please like a ${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'person'
									})} to be able to view it in the liked list.`}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : (
					<HorizontalGridScroll>
						{sort(people)
							.desc(({ mediaItem }) => mediaItem.popularity)
							.filter((_person, index) => index <= limit)
							.map((person) => (
								<PersonVerticalPoster
									key={person.mediaItem.id}
									person={person.mediaItem}
									sx={{ width }}
								/>
							))}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>

			{total > 0 && (
				<HorizontalGridFooter>
					<Button
						color={color}
						colorMode={colorMode}
						isFullWidth
						onClick={() => onTabChange({ index: 1 })}
						size={isSm ? 'xs' : 'sm'}
						variant='text'
					>
						{`View all ${numbro(total).format({ average: true })} liked ${formatMediaTypeLabel({
							type: total === 1 ? 'single' : 'multiple',
							mediaType: 'person'
						})}`}
					</Button>
				</HorizontalGridFooter>
			)}
		</HorizontalGrid>
	);
};

export default OverviewTabLikedPeople;
