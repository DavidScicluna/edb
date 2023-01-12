import { DummyCardProps } from '@davidscicluna/component-library';

export type TVShowsDummyEpisodeProps = Omit<DummyCardProps, 'children'> & {
	hasDate?: boolean;
	hasOverview?: boolean;
};
