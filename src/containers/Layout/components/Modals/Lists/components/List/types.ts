import { List } from '../../../../../../../store/slices/User/types';

export type ListProps = { isSelected?: boolean; onClick: (id: List['id'], isSelected: boolean) => void } & List;
