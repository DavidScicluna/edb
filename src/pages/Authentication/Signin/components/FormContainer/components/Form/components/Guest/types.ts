import { ReactElement } from 'react';

type RenderProps = {
	label: string;
	onClick: () => void;
};

export type GuestProps = {
	renderAction: (props: RenderProps) => ReactElement;
};
