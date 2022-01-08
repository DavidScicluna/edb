import { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import { useSelector } from '../../../common/hooks';
import { VerticalGridProps } from './types';

const VerticalGrid = (props: VerticalGridProps): ReactElement => {
  const [isXs] = useMediaQuery('(max-width: 320px)');
  const [isXl] = useMediaQuery('(min-width: 1920px)');

  const displayMode = useSelector((state) => state.app.ui.displayMode);

  const { children } = props;

  return (
    <SimpleGrid
      width='100%'
      columns={displayMode === 'list' ? 1 : [isXs ? 1 : 2, 3, 4, 5, 5, isXl ? 7 : 6]}
      spacing={2}
    >
      {children({ displayMode })}
    </SimpleGrid>
  );
};

export default VerticalGrid;
