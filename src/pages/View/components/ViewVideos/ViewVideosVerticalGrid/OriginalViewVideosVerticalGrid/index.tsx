import { FC } from 'react';

import { useTheme, Button, Badge, BadgeLabel, Icon, utils } from '@davidscicluna/component-library';

import { range } from 'lodash';

import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	VerticalGrid
} from '../../../../../../components';
import { useUserTheme } from '../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../../common/utils';
import DummyVideo from '../../components/ViewVideosDummyVideo';
import Video from '../../components/ViewVideosVideo';

import { ViewVideosVerticalGridProps } from './types';

const { getColor } = utils;

const ViewVideosVerticalGrid: FC<ViewVideosVerticalGridProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const {
		mediaType,
		videos = [],
		name,
		isFetching = false,
		isLoading = false,
		isError = false,
		isSuccess = false,
		error,
		refetch
	} = props;

	return !(isFetching || isLoading) && isError ? (
		<QueryEmpty
			color={color}
			colorMode={colorMode}
			borderWidth='2px'
			borderStyle='dashed'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='lg'
		>
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
						{getEmptySubtitle({
							type: 'error',
							label: name
								? `"${name}" Videos`
								: `${formatMediaTypeLabel({ type: 'single', mediaType })} Videos`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>

				{error &&
					error.response?.data &&
					error.response.data.status_code &&
					error.response.data.status_message && (
						<Badge color={color} colorMode={colorMode}>
							<BadgeLabel>{`(${error.response.data.status_code}) ${error.response.data.status_message}`}</BadgeLabel>
						</Badge>
					)}

				{refetch && (
					<QueryEmptyActions
						renderActions={(props) => (
							<Button {...props} onClick={refetch}>
								Try Again
							</Button>
						)}
					/>
				)}
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetching || isLoading) && isSuccess && videos.length === 0 ? (
		<QueryEmpty
			color={color}
			colorMode={colorMode}
			borderWidth='2px'
			borderStyle='dashed'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='lg'
		>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'empty',
							label: name
								? `"${name}" Videos`
								: `${formatMediaTypeLabel({ type: 'single', mediaType })} Videos`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetching || isLoading) && isSuccess && videos.length > 0 ? (
		<VerticalGrid displayMode='grid'>
			{() =>
				videos.map((video, index) => (
					<Video key={video.key} mediaType={mediaType} index={index} video={video} />
				))
			}
		</VerticalGrid>
	) : (
		<VerticalGrid displayMode='grid'>
			{() => range(5).map((_dummy, index) => <DummyVideo key={index} />)}
		</VerticalGrid>
	);
};

export default ViewVideosVerticalGrid;
