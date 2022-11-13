import { UserProfileStructureProps } from '../../../../../../../components/UserProfileStructure/types';

export type UserAvatarProps = Pick<UserProfileStructureProps, 'colorMode'> & {
	alt: string;
};
