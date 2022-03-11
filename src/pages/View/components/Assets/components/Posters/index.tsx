import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import range from 'lodash/range';

import { PostersProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';
import Image from '../Image';

const incrementBy = 10;

const Posters = (props: PostersProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { alt, posters = [], isLoading = true, isError = false, isSuccess = false, onClickImage } = props;

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={4}>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${alt ? `"${alt}"` : ''} posters list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && posters && posters.length === 0 ? (
				<Empty
					label={`${alt ? `"${alt}" posters` : 'Posters'} list is currently empty!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && posters && posters.length > 0 ? (
				<VerticalGrid displayMode='grid'>
					{() =>
						posters
							.filter((_poster, index) => index < totalVisible)
							.map((poster, index: number) => (
								<Image
									key={index}
									alt={alt}
									aspect_ratio={poster.aspect_ratio}
									file_path={poster.file_path}
									srcSize={['w92', 'original']}
									isLoading={false}
									onClickImage={onClickImage}
								/>
							))
					}
				</VerticalGrid>
			) : (
				<VerticalGrid displayMode='grid'>
					{() =>
						range(0, isSuccess && posters && posters.length > 0 ? posters.length : 20).map(
							(_dummy, index: number) => (
								<Image
									key={index}
									alt={alt}
									aspect_ratio={0.667}
									srcSize={['w92', 'original']}
									isLoading
								/>
							)
						)
					}
				</VerticalGrid>
			)}

			<ScaleFade
				in={posters.length > 0 && posters.length > incrementBy}
				unmountOnExit
				style={{ width: isSm ? '100%' : 'auto' }}
			>
				<LoadMore
					color={color}
					amount={totalVisible}
					total={posters.length}
					label={alt ? `"${alt}" posters` : 'Posters'}
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default Posters;
