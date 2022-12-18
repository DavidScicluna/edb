import { FC } from 'react';

import { Space, useTheme } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { Plock } from 'react-plock';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';

import { ViewMasonryProps } from './types';

const ViewMasonry: FC<ViewMasonryProps> = ({ children }) => {
	const theme = useTheme();

	const { spacing } = useLayoutContext();

	return (
		<Center width='100%' alignItems='stretch' justifyContent='stretch' sx={{ '& div': { width: '100%' } }}>
			<Plock
				breakpoints={[
					{ size: 480, columns: 1 },
					{ size: 768, columns: 2 },
					{ size: 992, columns: 4 },
					{ size: 1280, columns: 4 },
					{ size: 1536, columns: 6 }
				]}
				gap={theme.space[spacing as Space]}
				debounce={500}
			>
				{children}
			</Plock>
		</Center>
	);
};

export default ViewMasonry;
