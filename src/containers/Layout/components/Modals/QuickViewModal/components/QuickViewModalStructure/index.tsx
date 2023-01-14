import { FC } from 'react';

import { Grid, GridItem } from '@chakra-ui/react';

import spacing from '../../common/data/spacing';

import { QuickViewModalStructureProps } from './types';

const QuickViewModalStructure: FC<QuickViewModalStructureProps> = ({ renderPoster, renderContent }) => {
	return (
		<Grid
			width='100%'
			height='100%'
			templateRows={['repeat(2, 1fr)', 'repeat(1, 1fr)']}
			templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
			gap={spacing}
		>
			<GridItem>{renderPoster()}</GridItem>
			<GridItem>{renderContent()}</GridItem>
		</Grid>
	);
};

export default QuickViewModalStructure;
