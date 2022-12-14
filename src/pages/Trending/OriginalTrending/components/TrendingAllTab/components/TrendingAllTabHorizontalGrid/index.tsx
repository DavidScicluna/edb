import { FC } from 'react';

import { useTheme, Button } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridFooter
} from '../../../../../../../components';
import { useUserTheme } from '../../../../../../../common/hooks';

import { TrendingAllTabHorizontalGridProps } from './types';

const TrendingAllTabHorizontalGrid: FC<TrendingAllTabHorizontalGridProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { children, title, subtitle, footerLabel, isDisabled, onFooterClick } = props;

	return (
		<HorizontalGrid colorMode={colorMode} isDisabled={isDisabled} isFullWidth spacing={2} p={2}>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>{title}</Text>}
				renderSubtitle={(props) => <Text {...props}>{subtitle}</Text>}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>{children}</HorizontalGridBody>
			{onFooterClick && (
				<HorizontalGridFooter>
					<Button
						color={color}
						colorMode={colorMode}
						isFullWidth
						onClick={onFooterClick}
						size={isSm ? 'xs' : 'sm'}
						variant='text'
					>
						{footerLabel}
					</Button>
				</HorizontalGridFooter>
			)}
		</HorizontalGrid>
	);
};

export default TrendingAllTabHorizontalGrid;
