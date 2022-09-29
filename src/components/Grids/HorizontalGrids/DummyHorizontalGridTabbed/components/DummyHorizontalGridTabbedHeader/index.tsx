import { FC } from 'react';

import { DummyCardHeader, DummyTabList } from '@davidscicluna/component-library';

import { VStack, HStack } from '@chakra-ui/react';

import DummyArrows from '../../../components/DummyArrows';

import { DummyHorizontalGridTabbedHeaderProps } from './types';

const DummyHorizontalGridTabbedHeader: FC<DummyHorizontalGridTabbedHeaderProps> = (props) => {
	const { dummyCardHeaderProps, dummyTabListProps, dummyArrowProps, spacing = 2, ...rest } = props;

	return (
		<VStack {...rest} width='100%' spacing={spacing}>
			<DummyCardHeader
				{...dummyCardHeaderProps}
				actions={
					<HStack spacing={2}>
						{dummyCardHeaderProps.actions}

						<DummyArrows dummyArrowProps={dummyArrowProps} />
					</HStack>
				}
			/>

			<DummyTabList {...dummyTabListProps} />
		</VStack>
	);
};

export default DummyHorizontalGridTabbedHeader;
