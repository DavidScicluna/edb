import { FC } from 'react';

import { useTheme, Button, Badge, BadgeLabel, Icon, utils } from '@davidscicluna/component-library';

import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions
} from '../../../../../components';
import { useUserTheme } from '../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import Masonry from '../components/ViewPhotosMasonry';
import DummyPhoto from '../components/ViewPhotosDummyPhoto';
import { formatMediaTypeLabel } from '../../../../../common/utils';

import Photo from './components/ViewPhotosPhoto';
import { ViewPhotosProps } from './types';

const { getColor } = utils;

const ViewPhotos: FC<ViewPhotosProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const {
		mediaType,
		photos = [],
		dummyPhotos,
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
								? `"${name}" Photos`
								: `${formatMediaTypeLabel({ type: 'single', mediaType })} Photos`
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
	) : !(isFetching || isLoading) && isSuccess && photos.length === 0 ? (
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
								? `"${name}" Photos`
								: `${formatMediaTypeLabel({ type: 'single', mediaType })} Photos`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetching || isLoading) && isSuccess && photos.length > 0 ? (
		<Masonry
			items={photos.map((photo) => {
				return { ...photo, mediaType, name };
			})}
			render={Photo}
		/>
	) : (
		<Masonry items={dummyPhotos} render={DummyPhoto} />
	);
};

export default ViewPhotos;
