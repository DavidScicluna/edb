import { FC } from 'react';

import { DummyCardHeader } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import DummyArrows from '../../../components/DummyArrows';

import { DummyHorizontalGridHeaderProps } from './types';

const DummyHorizontalGridHeader: FC<DummyHorizontalGridHeaderProps> = ({ actions, dummyArrowProps, ...rest }) => {
	return (
		<DummyCardHeader
			{...rest}
			actions={
				<HStack spacing={2}>
					{actions}

					<DummyArrows dummyArrowProps={dummyArrowProps} />
				</HStack>
			}
		/>
	);
};

export default DummyHorizontalGridHeader;
