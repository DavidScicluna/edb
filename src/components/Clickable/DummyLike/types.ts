import { ReactElement } from 'react';

import { IconType, IconCategory } from '@davidscicluna/component-library';

export type RenderActionProps = {
	iconType: IconType;
	iconCategory: IconCategory;
};

export type DummyLikeProps = {
	renderAction: (props: RenderActionProps) => ReactElement;
};
