import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import { TVProps } from './types';

import LoadMore from '../../../../components/Clickable/LoadMore';
import VerticalTV from '../../../TV/components/Orientation/Vertical';

const incrementBy = 20;

const TV = ({ shows }: TVProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={4}>
			<VerticalTV
				isError={shows.length === 0}
				isSuccess={shows.length > 0}
				isLoading={false}
				shows={shows.filter((_show, index) => index < totalVisible)}
			/>

			<ScaleFade
				in={shows.length > 0 && shows.length > incrementBy}
				unmountOnExit
				style={{ width: isSm ? '100%' : 'auto' }}
			>
				<LoadMore
					amount={totalVisible}
					total={shows.length}
					label='TV Shows'
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default TV;
