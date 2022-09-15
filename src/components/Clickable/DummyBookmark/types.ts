import { ReactElement } from 'react';

import { IconCategory, IconType } from '@davidscicluna/component-library';

type RenderActionProps = {
	iconType: IconType;
	iconCategory: IconCategory;
};

export type DummyBookmarkProps = {
	renderAction: (props: RenderActionProps) => ReactElement;
};
