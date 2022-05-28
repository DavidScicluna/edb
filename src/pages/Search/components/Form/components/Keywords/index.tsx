import { ReactElement } from 'react';

import { useMediaQuery, useConst, VStack, ScaleFade } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';


import { useSelector } from '../../../../../../common/hooks';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';
import List from '../List';
import ListItem from '../List/components/ListItem';

import { KeywordsProps } from './types';

const dummy = sample(range(4, 8));

const Keywords = (props: KeywordsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const {
		keywords,
		isLoading = true,
		isError = false,
		isSuccess = false,
		hasNextPage = true,
		onKeywordClick,
		onFetchNextPage
	} = props;

	const dummies = useConst<number[]>(range(0, dummy));

	return (
		<VStack width='100%' spacing={4}>
			<List title='Keywords'>
				{!isLoading && isError ? (
					<Error
						hasIllustration={false}
						label='Oh no! Something went wrong'
						description='Failed to fetch keywords!'
						size='xs'
					/>
				) : !isLoading && isSuccess && keywords?.results && keywords.results.length === 0 ? (
					<Empty hasIllustration={false} label='Oh no!' description='No keywords found!' size='xs' />
				) : !isLoading && isSuccess && keywords?.results && keywords.results.length > 0 ? (
					<>
						{keywords.results.map((keyword) => (
							<ListItem
								key={keyword.id}
								title={keyword.name}
								isLoading={false}
								onClick={() => onKeywordClick(keyword.name)}
								variant='transparent'
							/>
						))}
					</>
				) : (
					<>
						{dummies.map((_dummy, index) => (
							<ListItem
								key={index}
								id={String(index)}
								title={`Keyword ${index + 1}`}
								isLoading
								variant='transparent'
							/>
						))}
					</>
				)}
			</List>

			{!isLoading ? (
				<ScaleFade in={hasNextPage && !isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
					<LoadMore
						color={color}
						amount={keywords?.results?.length || 0}
						total={keywords?.total_results || 0}
						label='Keywords'
						isLoading={isLoading}
						isButtonVisible={hasNextPage && !isError}
						onClick={onFetchNextPage}
					/>
				</ScaleFade>
			) : null}
		</VStack>
	);
};

export default Keywords;
