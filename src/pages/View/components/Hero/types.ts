import { ReactElement } from 'react';

export type HeroProps = {
	renderPoster: () => ReactElement;
	renderBackdrop: () => ReactElement;
	renderDetails: () => ReactElement;
	tagline?: string | null;
	overview?: string | null;
	isLoading?: boolean;
};
