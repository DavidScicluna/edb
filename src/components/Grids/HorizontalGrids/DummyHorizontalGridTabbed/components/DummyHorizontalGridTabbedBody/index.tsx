import { FC } from 'react';

import { CardBody, TabPanels } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { DummyHorizontalGridTabbedBodyProps } from './types';

const DummyHorizontalGridTabbedBody: FC<DummyHorizontalGridTabbedBodyProps> = ({ children, spacing = 2, ...rest }) => {
	return (
		<CardBody {...rest}>
			<TabPanels>
				{children.map((panel, index) => (
					<HStack key={index} spacing={spacing}>
						{panel}
					</HStack>
				))}
			</TabPanels>
		</CardBody>
	);
};

export default DummyHorizontalGridTabbedBody;
