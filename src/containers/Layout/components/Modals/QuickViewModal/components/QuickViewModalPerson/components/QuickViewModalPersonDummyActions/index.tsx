import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { DummyLike } from '../../../../../../../../../components';

const QuickViewModalPersonDummyActions: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyLike
			renderAction={() => (
				<DummyButton colorMode={colorMode} hasLeft isFullWidth variant='outlined'>
					Like person
				</DummyButton>
			)}
		/>
	);
};

export default QuickViewModalPersonDummyActions;
