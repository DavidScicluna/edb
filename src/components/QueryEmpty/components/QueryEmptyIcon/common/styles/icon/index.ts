import { Style } from '@davidscicluna/component-library';

import { QueryEmptyIconStyleProps } from './types';

export default ({ theme }: QueryEmptyIconStyleProps): Style => ({
	cursor: 'default',

	pointerEvents: 'auto',

	borderWidth: '2px',
	borderStyle: 'solid',
	borderRadius: theme.radii.full,

	userSelect: 'none'
});
