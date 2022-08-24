import { LayoutProps } from '../../../../types';

export type StructureCommonProps = Pick<LayoutProps, 'children'> & { isGuest?: boolean };
