import { DummyCardProps } from '@davidscicluna/component-library';

export type ViewDummyEpisodeProps = Omit<DummyCardProps, 'children'> & {
	hasDate?: boolean;
	hasOverview?: boolean;
};
