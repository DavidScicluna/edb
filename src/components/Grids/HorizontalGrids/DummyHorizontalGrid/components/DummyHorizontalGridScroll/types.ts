import { Space } from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

export type DummyHorizontalGridScrollProps = Pick<StackProps, 'children'> & {
	spacing?: Space;
};
