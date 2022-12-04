import { FC } from 'react';

import { useTheme, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { range } from 'lodash';
import numbro from 'numbro';

import { useUserTheme } from '../../../../../../../../../common/hooks';
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
	QueryEmptySubtitle,
	QueryEmptyActions
} from '../../../../../../../../../components';
import { getEmptySubtitle } from '../../../../../../../../../components/QueryEmpty/common/utils';
import { usePersonContext } from '../../../../common/hooks';
import { tabs } from '../../../..';
import DummyPhoto from '../../../../../components/DummyOverviewTab/components/DummyPhotos/components/DummyPhotosPhoto';

import Photo from './components/OverviewTabPhotosPhoto';

const OverviewTabPhotos: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { personQuery, imagesQuery, onSetActiveTab } = usePersonContext();
	const { data: person } = personQuery || {};
	const { name, gender } = person || {};
	const { data: images, isFetching, isLoading, isError, isSuccess } = imagesQuery || {};
	const { profiles = [] } = images || {};

	return (
		// TODO: Go over all HorizontalGrid and disabled if loading or error or not items
		<HorizontalGrid
			colorMode={colorMode}
			isDisabled={profiles.length === 0 || isFetching || isLoading || isError}
			isFullWidth
			spacing={2}
			p={2}
		>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>Photos</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This list is showcasing some of the photos that ${
							name ? name : 'the person'
						} has taken throughout ${gender === 1 ? 'her' : gender === 2 ? 'his' : 'their'} career`}
					</Text>
				)}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>
				{!(isFetching || isLoading) && isError ? (
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
									{getEmptySubtitle({
										type: 'error',
										label: name ? `${name} photos` : 'Photos'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
							<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && isSuccess && profiles && profiles.length === 0 ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({
										type: 'empty',
										label: name ? `${name} photos` : 'Photos'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
							<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && isSuccess && profiles && profiles.length > 0 ? (
					<HorizontalGridScroll>
						{profiles
							.filter((_profile, index) => index < 10)
							.map((profile, index) => (
								<Photo {...profile} key={profile.file_path} name={name} index={index} />
							))}
					</HorizontalGridScroll>
				) : (
					<HorizontalGridScroll>
						{range(10).map((_dummy, index) => (
							<DummyPhoto key={index} />
						))}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>
			<HorizontalGridFooter>
				<Button
					color={color}
					colorMode={colorMode}
					isFullWidth
					onClick={() => onSetActiveTab({ index: tabs.findIndex(({ path }) => path.hash === 'photos') || 2 })}
					size={isSm ? 'xs' : 'sm'}
					variant='text'
				>
					{`View all ${numbro(profiles.length).format({ average: true })} photos`}
				</Button>
			</HorizontalGridFooter>
		</HorizontalGrid>
	);
};

export default OverviewTabPhotos;
