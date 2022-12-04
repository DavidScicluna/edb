import { FC } from 'react';

import { HorizontalScroll } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { useUserTheme } from '../../../../common/hooks';

import { ViewInfoProps } from './types';

const ViewInfo: FC<ViewInfoProps> = ({ children, ...rest }) => {
	const { colorMode } = useUserTheme();

	return (
		<HorizontalScroll
			{...rest}
			maxWidth='100%'
			colorMode={colorMode}
			renderDivider={({ padding }) => <Center p={padding} />}
		>
			{children}
		</HorizontalScroll>
	);
};

export default ViewInfo;
