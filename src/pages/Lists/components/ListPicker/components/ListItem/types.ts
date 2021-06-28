import { List } from '../../../../../../store/slices/User/types';

export type ListItemProps = { isActive?: boolean; onClick?: (id: List['id']) => void } & List;
