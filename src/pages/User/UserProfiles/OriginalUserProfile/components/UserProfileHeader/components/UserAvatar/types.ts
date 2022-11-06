import { UserProfileStructureProps } from '../../../../../../../../components/User/UserProfileStructure/types';

export type UserAvatarProps = Pick<UserProfileStructureProps, 'colorMode'> & {
	alt: string;
};
