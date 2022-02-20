import { Icon, MediaType } from '../../../../common/types';

type RenderIconProps = {
	isActive: boolean;
	fontSize: string;
};

export type MediaTypeItem = {
	renderIcon: (props: RenderIconProps) => Icon;
	label: string;
	value: MediaType;
};

export type MediaTypeItemProps = {
	isActive?: boolean;
	onClick: (mediaType: MediaType) => void;
} & MediaTypeItem;
