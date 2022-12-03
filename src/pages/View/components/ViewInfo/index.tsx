import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import { ViewInfoProps } from './types';

const ViewInfo: FC<ViewInfoProps> = ({ children, ...rest }) => {
	return (
		<HStack {...rest} maxWidth='100%' spacing={2}>
			{children}
		</HStack>
	);
};

export default ViewInfo;
