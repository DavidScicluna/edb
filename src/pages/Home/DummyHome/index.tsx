import { FC, useContext, Fragment } from 'react';

import { useTheme, Divider, DummyButton, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack } from '@chakra-ui/react';

import { range } from 'lodash';

import {
	DummyHorizontalGridTabbed,
	DummyHorizontalGridTabbedHeader,
	DummyHorizontalGridTabbedBody,
	DummyHorizontalGridTabbedFooter,
	DummyVerticalPoster
} from '../../../components';
import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import { spacing as defaultSpacing } from '../../../containers/Layout/common/data/defaultPropValues';
import { LayoutContext as LayoutContextType } from '../../../containers/Layout/types';
import { LayoutContext } from '../../../containers/Layout';
import { useUserTheme } from '../../../common/hooks';
import { formatMediaTypeLabel } from '../../../common/utils';

const { getColor } = utils;

// TODO: Extract vertical poster widths into method
export const width = ['185px', '205px', '230px'];

const DummyHome: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing = defaultSpacing } = useContext<LayoutContextType>(LayoutContext);

	return (
		<Page>
			<PageBody>
				<VStack width='100%' px={spacing} py={spacing} spacing={spacing}>
					{range(3).map((_dummy, index) => (
						<DummyHorizontalGridTabbed
							key={index}
							color={color}
							colorMode={colorMode}
							activeTab={0}
							dummyCardProps={{ isDivisible: false, isFullWidth: true, p: 2, spacing: 2 }}
							sx={{ width: '100%' }}
						>
							<DummyHorizontalGridTabbedHeader
								dummyCardHeaderProps={{ hasTitle: true, hasSubtitle: true, pb: 2 }}
								dummyArrowProps={{ variant: 'icon' }}
								dummyTabListProps={{
									tabs: [
										{ label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }) },
										{ label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }) },
										{ label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }) }
									]
								}}
								divider={<Divider colorMode={colorMode} />}
								spacing={0}
							/>
							<DummyHorizontalGridTabbedBody>
								{range(3).map((_dummy, index) => (
									<Fragment key={index}>
										{range(20).map((_dummy, index) => (
											<DummyVerticalPoster
												key={index}
												mediaType='movie'
												hasSubtitle
												sx={{ width }}
											/>
										))}
									</Fragment>
								))}
							</DummyHorizontalGridTabbedBody>
							<DummyHorizontalGridTabbedFooter
								borderTopWidth='2px'
								borderTopStyle='solid'
								borderTopColor={getColor({ theme, colorMode, type: 'divider' })}
								pt={2}
							>
								<DummyButton
									color={color}
									colorMode={colorMode}
									isFullWidth
									size={isSm ? 'xs' : 'sm'}
									variant='text'
								>
									View all title media-type
								</DummyButton>
							</DummyHorizontalGridTabbedFooter>
						</DummyHorizontalGridTabbed>
					))}
				</VStack>
			</PageBody>
		</Page>
	);
};

export default DummyHome;
