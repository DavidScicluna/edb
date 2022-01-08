import { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import { useSelector } from '../../../common/hooks';
import { VerticalGridProps } from './types';

const VerticalGrid = (props: VerticalGridProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 320px)');

  const displayMode = useSelector((state) => state.app.ui.displayMode);

  const { children } = props;

  return (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 3, 4, 5, 6, 7]} spacing={2}>
      {children({ displayMode })}
    </SimpleGrid>
  );
};

export default VerticalGrid;
