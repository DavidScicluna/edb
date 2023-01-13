import { FC } from 'react';

import { Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../common/hooks';
import { useTVShowContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { DisplayMode, TotalBadge } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import ViewCast from '../../../../../components/ViewCast/OriginalViewCast';

const CastTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { showQuery, creditsQuery } = useTVShowContext();

	const { data: show } = showQuery || {};
	const { name } = show || {};

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
							name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })
						} has a total of`}
						suffix='Series Cast Members'
						total={cast.length}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Series Cast</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'person'
						})} that made an appearance in ${
							name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
						}`}
					</Text>
				)}
				renderRight={() => <DisplayMode />}
				py={spacing * 2}
			/>

			<ViewCast
				mediaType='tv'
				cast={cast}
				name={name}
				isLoading={isFetchingCredits || isCreditsLoading}
				isError={isCreditsError}
				isSuccess={isCreditsSuccess}
				refetch={refetchCredits}
			/>
		</VStack>
	);
};

export default CastTab;
