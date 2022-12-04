import { FC } from 'react';

import { useTheme, Headline, Button, Badge, BadgeLabel, Divider, Icon, utils } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	TotalBadge
} from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../../common/hooks';
import { usePersonContext } from '../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../components/QueryEmpty/common/utils';
import Masonry from '../../../components/PersonsMasonry';
import DummyPhoto from '../../../components/DummyPhotosTab/components/DummyPhotosTabPhoto';

import Photo from './components/PhotosTabPhoto';

const { getColor } = utils;

const PhotosTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { personQuery, imagesQuery } = usePersonContext();

	const { data: person } = personQuery || {};
	const { name, gender } = person || {};

	const { data: images, isFetching, isLoading, isError, isSuccess, error, refetch } = imagesQuery || {};
	const { profiles = [] } = images || {};

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${name ? name : 'Person'} has a total of`}
						suffix='Photos'
						total={profiles.length || 0}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Photos</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the photos that ${name ? name : 'the person'} has taken throughout ${
							gender === 1 ? 'her' : gender === 2 ? 'his' : 'their'
						} career.`}
					</Text>
				)}
				py={spacing * 2}
			/>

			<VStack width='100%'>
				{!(isFetching || isLoading) && isError ? (
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
										label: name ? `"${name}" Photos` : 'Photos'
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
										<Button {...props} onClick={() => refetch()}>
											Try Again
										</Button>
									)}
								/>
							)}
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && isSuccess && profiles.length === 0 ? (
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
										label: name ? `"${name}" Photos` : 'Photos'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && isSuccess && profiles.length > 0 ? (
					<Masonry>
						{profiles.map((profile, index) => (
							<Photo {...profile} key={profile.file_path} name={name} index={index} />
						))}
					</Masonry>
				) : (
					<Masonry>
						{range(10).map((_dummy, index) => (
							<DummyPhoto key={index} />
						))}
					</Masonry>
				)}
			</VStack>
		</VStack>
	);
};

export default PhotosTab;
