import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { DummyLike } from '../../../../../../components';
import ViewActions from '../../../../components/ViewActions';
import { useUserTheme } from '../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../common/utils';

import { PersonsDummyActionsProps } from './types';

const PersonsDummyActions: FC<PersonsDummyActionsProps> = (props) => {
	const { colorMode } = useUserTheme();

	return (
		<ViewActions {...props}>
			<DummyLike
				renderAction={() => (
					<DummyButton color='gray' colorMode={colorMode} hasLeft isFullWidth size='lg' variant='outlined'>
						{formatMediaTypeLabel({ type: 'single', mediaType: 'person' })}
					</DummyButton>
				)}
			/>
		</ViewActions>
	);
};

export default PersonsDummyActions;
