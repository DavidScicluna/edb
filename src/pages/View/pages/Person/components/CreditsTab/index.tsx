import { ReactElement } from 'react';

import { range } from 'lodash';

import MediaItems from './components/MediaItems';
import { CreditsTabProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Accordions from '../../../../../../components/Accordions';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';

const CreditsTab = (props: CreditsTabProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	const { departments = [], name, isLoading = true, isError = false, isSuccess = false } = props;

	return !isLoading && isError ? (
		<Error
			label='Oh no! Something went wrong'
			description={`Failed to fetch ${name ? `"${name}"` : ''} credits list!`}
			variant='outlined'
		/>
	) : !isLoading && isSuccess && departments.length === 0 ? (
		<Empty label={`${name ? `"${name}" credits` : 'Credits'} list is currently empty!`} variant='outlined' />
	) : (
		<Accordions
			accordions={
				!isLoading && isSuccess && departments.length > 0
					? departments.map((department) => {
							return {
								id: department.id,
								title: department.label,
								total: {
									number:
										(department.credits.cast?.movie?.length || 0) +
										(department.credits.cast?.tv?.length || 0) +
										(department.credits.crew?.movie?.length || 0) +
										(department.credits.crew?.tv?.length || 0)
								},
								isDisabled:
									(department.credits.cast?.movie?.length || 0) +
										(department.credits.cast?.tv?.length || 0) +
										(department.credits.crew?.movie?.length || 0) +
										(department.credits.crew?.tv?.length || 0) ===
									0,
								data: department.credits
							};
					  })
					: range(0, 10).map((_dummy, index: number) => {
							return {
								id: `${index}`,
								title: `Department ${index + 1}`,
								isDisabled: true
							};
					  })
			}
			renderAccordion={({ title, data }) => (
				<MediaItems
					movies={[...(data?.cast?.movie || []), ...(data?.crew?.movie || [])]}
					shows={[...(data?.cast?.tv || []), ...(data?.crew?.tv || [])]}
					label={title}
					job={
						(data?.cast?.movie?.length || 0) + (data?.cast?.tv?.length || 0) >
						(data?.crew?.movie?.length || 0) + (data?.crew?.tv?.length || 0)
							? 'cast'
							: 'crew'
					}
				/>
			)}
			color={color}
			isLoading={isLoading}
			isError={isError}
		/>
	);
};

export default CreditsTab;
