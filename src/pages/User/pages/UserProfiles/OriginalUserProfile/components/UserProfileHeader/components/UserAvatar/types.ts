import { UserProfileStructureProps } from '../../../../../../../components/UserAssetsStructure/types';

export type UserAvatarProps = Pick<UserProfileStructureProps, 'colorMode'> & {
	alt: string;
};
