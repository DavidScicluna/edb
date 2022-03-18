import { SuspenseProps as RSuspenseProps } from 'react';

export type SuspenseProps = Omit<RSuspenseProps, 'fallback'>;
