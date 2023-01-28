import { FC } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, Stack } from '@chakra-ui/react';

import DummyOverviewTabEpisode from '../DummyOverviewTabEpisode';
import { useLayoutContext } from '../../../../../../../../containers/Layout/common/hooks';

const DummyOverviewTabPrevNextEpisodes: FC = () => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const { spacing } = useLayoutContext();

	return (
		<Stack width='100%' direction={isLg ? 'column' : 'row'} spacing={spacing}>
			<DummyOverviewTabEpisode />

			<DummyOverviewTabEpisode />
		</Stack>
	);
};

export default DummyOverviewTabPrevNextEpisodes;
