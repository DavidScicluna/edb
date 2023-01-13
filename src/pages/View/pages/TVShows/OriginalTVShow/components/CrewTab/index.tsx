import { FC, useState } from 'react';

import { useTheme, useDebounce, Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../common/hooks';
import { useTVShowContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { DisplayMode, TotalBadge } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import ViewCrew from '../../../../../components/ViewCrew/OriginalViewCrew';
import { ViewCrewDepartments } from '../../../../../components/ViewCrew/OriginalViewCrew/types';
import { getTVShowCrewDepartments } from '../../../../../components/ViewCrew/OriginalViewCrew/common/utils';

const CrewTab: FC = () => {
	const theme = useTheme();
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
	const { crew = [] } = credits || {};

	const [departments, setDepartments] = useState<ViewCrewDepartments<'tv'>>(getTVShowCrewDepartments({ crew }));
	const departmentsDebounced = useDebounce<ViewCrewDepartments<'tv'>>(departments, 'slow');

	useUpdateEffect(() => setDepartments(getTVShowCrewDepartments({ crew })), [crew]);

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
							name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })
						} has a total of`}
						suffix='Series Crew'
						total={crew.length}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Series Crew</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'person'
						})} that were involved in the making of ${
							name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
						}`}
					</Text>
				)}
				renderRight={() => <DisplayMode />}
				py={spacing * 2}
			/>

			<ViewCrew
				mediaType='tv'
				departments={departmentsDebounced}
				name={name}
				isLoading={isFetchingCredits || isCreditsLoading}
				isError={isCreditsError}
				isSuccess={isCreditsSuccess}
				refetch={refetchCredits}
			/>
		</VStack>
	);
};

export default CrewTab;
