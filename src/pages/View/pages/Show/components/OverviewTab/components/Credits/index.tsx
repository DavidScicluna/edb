import { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, Stack } from '@chakra-ui/react';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { CreatedBy as CreatedByType, Crew } from '../../../../../../../../common/types/tv';
import Label from '../../../../../../components/Hero/components/Label';

import CreatedBy from './components/CreatedBy';
import Credit from './components/Credit';
import { CreditsProps, ListItem } from './types';


const Credits = (props: CreditsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { show, crew = [], isLoading = true } = props;

	const [createdBy, setCreatedBy] = useState<CreatedByType[]>([]);
	const [directors, setDirectors] = useState<Crew[]>([]);
	const [executiveProducers, setExecutiveProducers] = useState<Crew[]>([]);
	const [producers, setProducers] = useState<Crew[]>([]);
	const [writers, setWriters] = useState<Crew[]>([]);

	const renderCredits: ListItem[] = compact([
		!(isNil(createdBy) || isEmpty(createdBy)) || isLoading
			? {
					label: 'Created By',
					children: (
						<CreatedBy key={`tv-show-${show?.id}-created-by`} people={createdBy} isLoading={isLoading} />
					)
			  }
			: undefined,
		!(isNil(directors) || isEmpty(directors)) || isLoading
			? {
					label: `Director${(directors || []).length > 1 ? 's' : ''}`,
					children: <Credit key={`tv-show-${show?.id}-directors`} people={directors} isLoading={isLoading} />
			  }
			: undefined,
		!(isNil(executiveProducers) || isEmpty(executiveProducers)) || isLoading
			? {
					label: `Executive Producer${(executiveProducers || []).length > 1 ? 's' : ''}`,
					children: (
						<Credit
							key={`tv-show-${show?.id}-executive-producers`}
							people={executiveProducers}
							isLoading={isLoading}
						/>
					)
			  }
			: undefined,
		!(isNil(producers) || isEmpty(producers)) || isLoading
			? {
					label: `Producer${(producers || []).length > 1 ? 's' : ''}`,
					children: <Credit key={`tv-show-${show?.id}-producers`} people={producers} isLoading={isLoading} />
			  }
			: undefined,
		!(isNil(writers) || isEmpty(writers)) || isLoading
			? {
					label: `Writer${(writers || []).length > 1 ? 's' : ''}`,
					children: <Credit key={`tv-show-${show?.id}-producers`} people={writers} isLoading={isLoading} />
			  }
			: undefined
	]);

	useEffect(() => {
		if (!(isNil(show) || isEmpty(show)) && !isLoading) {
			setCreatedBy(show?.created_by || []);
		}
	}, [show]);

	useEffect(() => {
		if (!(isNil(crew) || isEmpty(crew)) && !isLoading) {
			crew.filter((person) => {
				const jobs = person.jobs && person.jobs.length > 0 ? person.jobs.map((job) => job.job) : [];

				jobs.forEach((job) => {
					switch (job) {
						case 'Director': {
							setDirectors([...directors, person]);
							break;
						}
						case 'Executive Producer': {
							setExecutiveProducers([...executiveProducers, person]);
							break;
						}
						case 'Producer': {
							setProducers([...producers, person]);
							break;
						}
						case 'Writer': {
							setWriters([...writers, person]);
							break;
						}
						default:
							break;
					}
				});
			});
		}
	}, [crew]);

	return (
		<Stack
			width='100%'
			maxWidth='100%'
			alignItems='stretch'
			justifyContent='stretch'
			direction={isSm ? 'column' : 'row'}
			spacing={isSm ? 2 : 4}
		>
			{renderCredits.map((credit, index: number) =>
				credit.children ? (
					<Label
						key={index}
						width={isSm ? '100%' : 'auto'}
						maxWidth={isSm ? '100%' : `${100 / renderCredits.length}%`}
						flex={1}
						label={credit.label}
					>
						{credit.children}
					</Label>
				) : null
			)}
		</Stack>
	);
};

export default Credits;
