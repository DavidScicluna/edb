import { AssetProps } from '../../types';

export type GridProps = Omit<AssetProps, 'id' | 'title' | 'total' | 'isOpen' | 'isLoading' | 'onToggle'>;
