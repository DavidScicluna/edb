import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import _ from 'lodash';

import { CastProps } from './types';

import { useSelector } from '../../../../../../../../common/hooks';
import Button from '../../../../../../../../components/Clickable/Button';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../components/Grid/Horizontal/Default';
import VerticalPoster from '../../../../../../../../components/Poster/Vertical';

const width = ['185px', '205px', '230px'];

const Cast = (props: CastProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { name, cast, isError = false, isSuccess = false, isLoading = true, onChangeTab } = props;

	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<HorizontalGrid
			title='Cast'
			footer={
				<Button
					color={color}
					isFullWidth
					isDisabled={isLoading}
					onClick={() => onChangeTab()}
					size={isSm ? 'sm' : 'md'}
					variant='text'
				>
					{`View all ${cast?.length || 0} cast member${
						cast && (cast.length === 0 || cast.length > 1 ? 's' : '')
					}`}
				</Button>
			}
			isDisabled={isLoading || cast?.length === 0}
			variant='outlined'
		>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${name ? `"${name}"` : ''} cast list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && cast && cast.length === 0 ? (
				<Empty label={`${name ? `"${name}" cast` : 'Cast'} list is currently empty!`} variant='transparent' />
			) : !isLoading && isSuccess && cast && cast.length > 0 ? (
				cast
					.filter((_person, index) => index < 5)
					.map((person) => (
						<VerticalPoster
							key={person.id}
							width={width}
							mediaItem={person ? { ...person } : undefined}
							mediaType='person'
							image={{
								alt: `${person?.name || ''} person poster`,
								src: person?.profile_path || '',
								size: {
									thumbnail: 'w45',
									full: 'original'
								}
							}}
							title={person?.name || ''}
							subtitle={person.character ? `As ${person.character}` : ''}
							isLoading={isLoading}
						/>
					))
			) : (
				_.range(0, 5).map((_dummy, index: number) => (
					<VerticalPoster key={index} width={width} mediaType='person' title='Cast Member Name' isLoading />
				))
			)}
		</HorizontalGrid>
	);
};

export default Cast;