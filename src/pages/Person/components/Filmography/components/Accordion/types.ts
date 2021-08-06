import { ExpandedIndex } from '@chakra-ui/react';

import { Department } from '../../../../types';

export type AccordionProps = {
  departments: Department[];
  expanded: ExpandedIndex;
  isLoading?: boolean;
  onChange: (indexes: ExpandedIndex) => void;
};
