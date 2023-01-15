import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { DummyBookmark, DummyLike } from '../../../../../../../../../components';
import spacing from '../../../../common/data/spacing';

const QuickViewModalMovieDummyActions: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<HStack width='100%' spacing={spacing}>
			<DummyLike
				renderAction={() => (
					<DummyButton colorMode={colorMode} hasLeft isFullWidth variant='outlined'>
						Like movie
					</DummyButton>
				)}
			/>
			<DummyBookmark
				renderAction={() => (
					<DummyButton colorMode={colorMode} hasLeft isFullWidth variant='outlined'>
						Add movie to a list
					</DummyButton>
				)}
			/>
		</HStack>
	);
};

export default QuickViewModalMovieDummyActions;
