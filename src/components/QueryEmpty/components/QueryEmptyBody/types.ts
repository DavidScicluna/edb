import { BoxTypography, BoxFlexbox, BoxGrid, BoxPosition, BoxShadow, BoxOther } from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

type Omitted = BoxTypography | BoxFlexbox | BoxGrid | BoxPosition | BoxShadow | BoxOther | 'as' | 'direction';

export type QueryEmptyBodyProps = Omit<StackProps, Omitted>;
