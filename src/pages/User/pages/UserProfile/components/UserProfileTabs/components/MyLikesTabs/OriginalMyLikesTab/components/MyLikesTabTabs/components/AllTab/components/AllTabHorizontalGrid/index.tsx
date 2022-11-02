import { FC } from 'react';

import { useTheme, Button } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../../../../../../../common/hooks';
import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridScroll,
	HorizontalGridFooter
} from '../../../../../../../../../../../../../../../components';

import { AllTabHorizontalGridProps } from './types';

// TODO: Extract vertical poster widths into method
export const width = ['185px', '205px', '230px'];

const AllTabHorizontalGrid: FC<AllTabHorizontalGridProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { children, title, subtitle, footerLabel, onFooterClick } = props;

	return (
		<HorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>{title}</Text>}
				renderSubtitle={subtitle ? (props) => <Text {...props}>{subtitle}</Text> : undefined}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>
				<HorizontalGridScroll>{children}</HorizontalGridScroll>
			</HorizontalGridBody>
			{onFooterClick && (
				<HorizontalGridFooter>
					<Button
						color={color}
						colorMode={colorMode}
						isFullWidth
						onClick={() => onFooterClick()}
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

export default AllTabHorizontalGrid;
