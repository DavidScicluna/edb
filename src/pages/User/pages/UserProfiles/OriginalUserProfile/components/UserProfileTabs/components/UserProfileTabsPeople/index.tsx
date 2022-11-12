import { FC, useState } from 'react';

import { useTheme, useDebounce, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	VerticalGrid,
	LoadMore,
	PersonHorizontalPoster,
	PersonVerticalPoster
} from '../../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';

import { UserProfileTabsPeopleProps } from './types';

const { getColor } = utils;

const limit = 20;

const UserProfileTabsPeople: FC<UserProfileTabsPeopleProps> = ({ people }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	// TODO: Go over all useDebounce and check if debounced value is being used
	const [visible, setVisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 'slow');

	return people && people.length === 0 ? (
		<QueryEmpty
			color={color}
			colorMode={colorMode}
			borderWidth='2px'
			borderStyle='dashed'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='lg'
		>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'empty',
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					sort(people)
						.desc((person) => person.addedAt)
						.filter((_person, index) => index <= visibleDebounced)
						.map((person) =>
							displayMode === 'list' ? (
								<PersonHorizontalPoster key={person.mediaItem.id} person={person.mediaItem} />
							) : (
								<PersonVerticalPoster key={person.mediaItem.id} person={person.mediaItem} />
							)
						)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={visibleDebounced}
					total={people.length}
					label={formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })}
					isLoading={false}
					isButtonVisible={visibleDebounced <= people.length}
					onClick={() => setVisible((total) => total + limit)}
				/>
			</Center>
		</VStack>
	);
};

export default UserProfileTabsPeople;
