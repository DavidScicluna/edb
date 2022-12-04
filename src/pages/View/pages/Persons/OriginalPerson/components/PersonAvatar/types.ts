import { FullPerson } from '../../../../../../../common/types/person';
import { ViewAvatarProps } from '../../../../../components/ViewAvatar/types';

export type PersonAvatarProps = Pick<ViewAvatarProps, 'onClick'> & {
	person: FullPerson;
};
