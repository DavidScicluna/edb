import { ReactElement } from 'react';

export type FormProps = {
  children: {
    input: ReactElement;
    collapsibleContent: ReactElement;
    display: ReactElement;
  };
};
