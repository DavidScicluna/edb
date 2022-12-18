import { FC } from 'react';

import { useTheme, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { lowerCase, range } from 'lodash';
import numbro from 'numbro';

import { useUserTheme } from '../../../../../common/hooks';
import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridScroll,
	HorizontalGridFooter,
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle
} from '../../../../../components';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import DummyVideo from '../components/ViewVideosHorizontalGridDummyVideo';

import { ViewVideosHorizontalGridProps } from './types';
import Video from './components/ViewVideosHorizontalGridVideo';

const ViewVideosHorizontalGrid: FC<ViewVideosHorizontalGridProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const {
		mediaType,
		videos = [],
		// dummyvideos = [],
		title = 'Videos',
		subtitle,
		emptyLabel,
		total = 0,
		isLoading = false,
		isError = false,
		isSuccess = false,
		onFooterClick
	} = props;

	return (
		// TODO: Go over all HorizontalGrid and disabled if loading or error or not items
		<HorizontalGrid
			colorMode={colorMode}
			isDisabled={videos.length === 0 || isLoading || isError}
			isFullWidth
			spacing={2}
			p={2}
		>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>{title}</Text>}
				renderSubtitle={subtitle ? (props) => <Text {...props}>{subtitle}</Text> : undefined}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>
				{!isLoading && isError ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyIcon
								renderIcon={(props) => (
									<Icon
										{...props}
										width={theme.fontSizes['6xl']}
										height={theme.fontSizes['6xl']}
										fontSize={theme.fontSizes['6xl']}
										icon='error_outline'
									/>
								)}
								p={2}
							/>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({ type: 'error', label: emptyLabel })}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !isLoading && isSuccess && videos && videos.length === 0 ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({ type: 'empty', label: emptyLabel })}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !isLoading && isSuccess && videos && videos.length > 0 ? (
					<HorizontalGridScroll>
						{videos
							.filter((_video, index) => index < 5)
							.map((video, index) => (
								<Video key={index} mediaType={mediaType} index={index} video={video} />
							))}
					</HorizontalGridScroll>
				) : (
					<HorizontalGridScroll>
						{range(5).map((_dummy, index) => (
							<DummyVideo key={index} />
						))}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>
			<HorizontalGridFooter>
				<Button
					color={color}
					colorMode={colorMode}
					isFullWidth
					onClick={onFooterClick}
					size={isSm ? 'xs' : 'sm'}
					variant='text'
				>
					{`View all ${numbro(total).format({ average: true })} ${lowerCase(title)}`}
				</Button>
			</HorizontalGridFooter>
		</HorizontalGrid>
	);
};

export default ViewVideosHorizontalGrid;
