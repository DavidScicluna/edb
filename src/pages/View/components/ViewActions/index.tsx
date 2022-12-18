import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';

import { ViewActionsProps } from './types';

const ViewActions: FC<ViewActionsProps> = ({ children, ...rest }) => {
	const { spacing } = useLayoutContext();

	return (
		<HStack {...rest} width='100%' spacing={spacing}>
			{children}
		</HStack>
	);
};

export default ViewActions;
