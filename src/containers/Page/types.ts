import { ReactElement } from 'react';

import { StackProps } from '@chakra-ui/react';

export type PageProps = {
	children: {
		actions?: ReactElement;
		body: ReactElement;
	};
	title?: string | ReactElement;
	direction?: StackProps['direction'];
};
