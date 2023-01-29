import { FC, Fragment } from 'react';

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
import { useUserTheme } from '../../../common/hooks';
import { formatMediaTypeLabel } from '../../../common/utils';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import dimensions from '../../../components/Posters/common/data/dimensions';

const { getColor } = utils;

const DummyHome: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageBody p={spacing}>
				<VStack width='100%' spacing={spacing}>
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
												sx={dimensions}
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
