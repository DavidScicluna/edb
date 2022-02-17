import { ReactElement } from 'react';

import { StackProps } from '@chakra-ui/react';


export type LabelProps = {
  children: ReactElement;
  label: string;
} & StackProps;
