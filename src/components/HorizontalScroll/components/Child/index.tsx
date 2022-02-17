import { ReactElement } from 'react';

import { useTheme, Center } from '@chakra-ui/react';

import { ChildProps } from './types';

import { Theme } from '../../../../theme/types';

const Child = ({ children, renderDivider, isLast = false }: ChildProps): ReactElement => {
	const theme = useTheme<Theme>();

	return (
		<Center height='100%'>
			{children}

			{renderDivider && !isLast ? (
				<Center p={0} m={0}>
					{renderDivider({ padding: theme.space['0.75'] })}
				</Center>
			) : null}
		</Center>
	);
};

export default Child;
