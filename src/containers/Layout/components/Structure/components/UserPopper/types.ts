import { ReactNode } from 'react';

import { PopoverProps } from '@chakra-ui/react';

type RenderActionProps = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

type Omitted = 'isOpen' | 'onOpen' | 'onClose';

export type UserPopperProps = Omit<PopoverProps, Omitted> & {
	renderAction: (props: RenderActionProps) => ReactNode;
} & Partial<RenderActionProps>;
