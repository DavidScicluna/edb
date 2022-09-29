import { FC } from 'react';

import { Tabs, DummyCard } from '@davidscicluna/component-library';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';

import { DummyHorizontalGridTabbedProps } from './types';

const DummyHorizontalGridTabbed: FC<DummyHorizontalGridTabbedProps> = (props) => {
	const { children, color = defaultColor, colorMode = defaultColorMode, dummyCardProps, ...rest } = props;

	return (
		<Tabs {...rest} color={color} colorMode={colorMode} isDisabled>
			<DummyCard {...dummyCardProps} colorMode={colorMode} spacing={dummyCardProps?.spacing || 0}>
				{children}
			</DummyCard>
		</Tabs>
	);
};

export default DummyHorizontalGridTabbed;
