import { FC } from 'react';

import { useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';

const { getColor } = utils;

const DummyBreadcrumb: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const breadcrumbFontSize = useBreakpointValue({
		'base': theme.fontSizes.sm,
		'sm': theme.fontSizes.sm,
		'md': theme.fontSizes.md,
		'lg': theme.fontSizes.md,
		'xl': theme.fontSizes.md,
		'2xl': theme.fontSizes.md
	});

	return (
		<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
			<Text
				align='left'
				color={getColor({ theme, colorMode, type: 'text.primary' })}
				fontSize={breadcrumbFontSize}
				fontWeight='medium'
			>
				Dummy Path
			</Text>
		</Skeleton>
	);
};

export default DummyBreadcrumb;
