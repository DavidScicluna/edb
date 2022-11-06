import { FC } from 'react';

import { Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { Headline } from '../../../../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../../../../common/hooks';

const DummyMyLikesTabHeadline: FC = () => {
	const { color, colorMode } = useUserTheme();

	return (
		<Headline
			width='100%'
			renderCaption={() => (
				// TODO: Replace with DummyBadge
				<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='text'>
					<Badge color={color} colorMode={colorMode} size='xs'>
						<BadgeLabel>Total of # likes</BadgeLabel>
					</Badge>
				</Skeleton>
			)}
			renderTitle={(props) => (
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text {...props}>My Likes</Text>
				</Skeleton>
			)}
			renderSubtitle={(props) => (
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text {...props}>
						This Tab contains all likes that have been added to the likes list and all likes are separated
						into tabs depending on the media type.
					</Text>
				</Skeleton>
			)}
		/>
	);
};

export default DummyMyLikesTabHeadline;
