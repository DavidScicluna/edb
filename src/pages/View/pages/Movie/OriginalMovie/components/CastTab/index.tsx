import { FC } from 'react';

import { Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../common/hooks';
import { useMovieContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { DisplayMode, TotalBadge } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import ViewCast from '../../../../../components/ViewCast/OriginalViewCast';

const CastTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { movieQuery, creditsQuery } = useMovieContext();

	const { data: movie } = movieQuery || {};
	const { title } = movie || {};

	const {
		data: credits,
		isFetching: isFetchingCredits,
		isLoading: isCreditsLoading,
		isError: isCreditsError,
		isSuccess: isCreditsSuccess,
		refetch: refetchCredits
	} = creditsQuery || {};
	const { cast = [] } = credits || {};

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							title ? title : formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })
						} has a total of`}
						suffix='Cast Members'
						total={cast.length}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Cast</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'person'
						})} that made an appearance in ${
							title ? title : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}`
						}`}
					</Text>
				)}
				renderRight={() => <DisplayMode />}
				py={spacing * 2}
			/>

			<ViewCast
				mediaType='movie'
				cast={cast}
				name={title}
				isLoading={isFetchingCredits || isCreditsLoading}
				isError={isCreditsError}
				isSuccess={isCreditsSuccess}
				refetch={refetchCredits}
			/>
		</VStack>
	);
};

export default CastTab;
