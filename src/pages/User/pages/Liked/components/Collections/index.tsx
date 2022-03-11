import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import { range } from 'lodash';

import { CollectionsProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import { Collection } from '../../../../../../common/types/movie';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';
import HorizontalCompanyPoster from '../../../../../Search/components/All/components/Collections/components/Poster/Horizontal';
import VerticalCompanyPoster from '../../../../../Search/components/All/components/Collections/components/Poster/Vertical';

const incrementBy = 20;

const Collections = ({ collections }: CollectionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={4}>
			{collections.length === 0 ? (
				<Error
					label='Oh no! Something went wrong'
					description='Failed to fetch collections list!'
					variant='outlined'
				/>
			) : collections && collections.length === 0 ? (
				<Empty label='Collections list is currently empty!' variant='outlined' />
			) : collections && collections.length > 0 ? (
				<VerticalGrid>
					{({ displayMode }) =>
						collections
							.filter((_company, index) => index < totalVisible)
							.map((collection: Collection) =>
								displayMode === 'list' ? (
									<HorizontalCompanyPoster
										key={collection.id}
										collection={collection}
										isLoading={false}
									/>
								) : (
									<VerticalCompanyPoster
										key={collection.id}
										collection={collection}
										isLoading={false}
									/>
								)
							)
					}
				</VerticalGrid>
			) : (
				<VerticalGrid>
					{({ displayMode }) =>
						range(0, collections && collections.length > 0 ? collections.length : 20).map(
							(_dummy, index: number) =>
								displayMode === 'list' ? (
									<HorizontalCompanyPoster key={index} isLoading />
								) : (
									<VerticalCompanyPoster key={index} isLoading />
								)
						)
					}
				</VerticalGrid>
			)}

			<ScaleFade
				in={collections.length > 0 && collections.length > incrementBy}
				unmountOnExit
				style={{ width: isSm ? '100%' : 'auto' }}
			>
				<LoadMore
					color={color}
					amount={totalVisible}
					total={collections.length}
					label='Collections'
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default Collections;
