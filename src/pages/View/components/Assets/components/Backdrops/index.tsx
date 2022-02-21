import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import _ from 'lodash';

import { BackdropsProps } from './types';

import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import Image from '../Image';

const incrementBy = 10;

const Backdrops = (props: BackdropsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { alt, backdrops = [], isLoading = true, isError = false, isSuccess = false, onClickImage } = props;

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={4}>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${alt ? `"${alt}"` : ''} backdrops list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && backdrops && backdrops.length === 0 ? (
				<Empty
					label={`${alt ? `"${alt}" backdrops` : 'Backdrops'} list is currently empty!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && backdrops && backdrops.length > 0 ? (
				<VerticalGrid columns={[1, 2, 2, 3, 3, 4]} displayMode='grid'>
					{() =>
						backdrops
							.filter((_backdrop, index) => index < totalVisible)
							.map((backdrop, index: number) => (
								<Image
									key={index}
									alt={alt}
									aspect_ratio={backdrop.aspect_ratio}
									file_path={backdrop.file_path}
									srcSize={['w300', 'original']}
									isLoading={false}
									onClickImage={onClickImage}
								/>
							))
					}
				</VerticalGrid>
			) : (
				<VerticalGrid columns={[1, 2, 2, 3, 3, 4]} displayMode='grid'>
					{() =>
						_.range(0, isSuccess && backdrops && backdrops.length > 0 ? backdrops.length : 20).map(
							(_dummy, index: number) => (
								<Image
									key={index}
									alt={alt}
									aspect_ratio={1.778}
									srcSize={['w300', 'original']}
									isLoading
								/>
							)
						)
					}
				</VerticalGrid>
			)}

			<ScaleFade
				in={backdrops.length > 0 && backdrops.length > incrementBy}
				unmountOnExit
				style={{ width: isSm ? '100%' : 'auto' }}
			>
				<LoadMore
					amount={totalVisible}
					total={backdrops.length}
					label={alt ? `"${alt}" backdrops` : 'Backdrops'}
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default Backdrops;