import { AssetProps } from '../../types';

export type HeaderProps = Omit<AssetProps, 'children' | 'id'>;
