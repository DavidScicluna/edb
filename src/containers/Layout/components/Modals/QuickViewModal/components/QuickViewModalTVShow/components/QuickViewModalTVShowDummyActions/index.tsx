import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { DummyBookmark, DummyLike } from '../../../../../../../../../components';
import spacing from '../../../../common/data/spacing';

const QuickViewModalTVShowDummyActions: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<HStack width='100%' spacing={spacing}>
			<DummyLike
				renderAction={() => (
					<DummyButton colorMode={colorMode} hasLeft isFullWidth variant='outlined'>
						Like tv show
					</DummyButton>
				)}
			/>
			<DummyBookmark
				renderAction={() => (
					<DummyButton colorMode={colorMode} hasLeft isFullWidth variant='outlined'>
						Add tv show to a list
					</DummyButton>
				)}
			/>
		</HStack>
	);
};

export default QuickViewModalTVShowDummyActions;
