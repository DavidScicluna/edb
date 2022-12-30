import { FC, useState } from 'react';

import { useTheme, useDebounce, Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../common/hooks';
import { useMovieContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { DisplayMode, TotalBadge } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import ViewCrew from '../../../../../components/ViewCrew/OriginalViewCrew';
import { ViewCrewDepartments } from '../../../../../components/ViewCrew/OriginalViewCrew/types';
import { getCrewDepartments } from '../../../../../components/ViewCrew/OriginalViewCrew/common/utils';

const CrewTab: FC = () => {
	const theme = useTheme();
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
	const { crew = [] } = credits || {};

	const [departments, setDepartments] = useState<ViewCrewDepartments<'movie'>>(getCrewDepartments({ crew }));
	const departmentsDebounced = useDebounce<ViewCrewDepartments<'movie'>>(departments, 'slow');

	useUpdateEffect(() => setDepartments(getCrewDepartments({ crew })), [crew]);

	return (
		<VStack
			width='100%'
			divider={
				<Divider
					colorMode={colorMode}
					mt={`${theme.space[spacing]} !important`}
					mb={`${theme.space[2]} !important`}
				/>
			}
			spacing={0}
		>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							title ? title : formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })
						} has a total of`}
						suffix='Crew'
						total={crew.length}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Crew</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'person'
						})} that were involved in the making of ${
							title ? title : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}`
						}`}
					</Text>
				)}
				renderRight={() => <DisplayMode />}
				py={spacing * 2}
			/>

			<ViewCrew
				mediaType='movie'
				departments={departmentsDebounced}
				name={title}
				isLoading={isFetchingCredits || isCreditsLoading}
				isError={isCreditsError}
				isSuccess={isCreditsSuccess}
				refetch={refetchCredits}
			/>
		</VStack>
	);
};

export default CrewTab;
