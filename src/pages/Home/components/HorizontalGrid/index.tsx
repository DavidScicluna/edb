import { ReactElement, forwardRef } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import compact from 'lodash/compact';
import range from 'lodash/range';

import { HomeHorizontalGridRef, HomeHorizontalGridProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalTabbedGrid from '../../../../components/Grid/Horizontal/Tabbed';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import VerticalMoviePoster from '../../../Movies/components/Poster/Vertical';
import VerticalPersonPoster from '../../../People/components/Poster/Vertical';
import VerticalTVShowPoster from '../../../TV/components/Poster/Vertical';

const width = ['185px', '205px', '230px'];

const HomeHorizontalGrid = forwardRef<HomeHorizontalGridRef, HomeHorizontalGridProps>(function HomeHorizontalGrid(
	props,
	ref
): ReactElement {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { activeTab, title, to, mediaTypes, data, isLoading, isError, isSuccess, onTabChange } = props;

	const handleIsDisabled = (): boolean => {
		switch (activeTab) {
			case 0:
				return isLoading.movie || isError.movie || false;
			case 1:
				return isLoading.tv || isError.tv || false;
			case 2:
				return isLoading.person || isError.person || false;
			default:
				return true;
		}
	};

	return (
		<HorizontalTabbedGrid
			ref={ref}
			activeTab={activeTab}
			onChange={onTabChange}
			footer={
				<Link to={to({ mediaType: mediaTypes[activeTab] })} isFullWidth isDisabled={handleIsDisabled()}>
					<Button
						color={color}
						isFullWidth
						isDisabled={handleIsDisabled()}
						size={isSm ? 'sm' : 'md'}
						variant='text'
					>
						{`View all ${title ? `"${title}"` : ''} ${mediaTypes[activeTab]}`}
					</Button>
				</Link>
			}
			isDisabled={handleIsDisabled()}
			renderTabListProps={{
				color,
				children: compact([
					mediaTypes.includes('movie')
						? {
								label: `${title} Movies`,
								isDisabled: isLoading.movie
						  }
						: undefined,
					mediaTypes.includes('tv')
						? {
								label: `${title} TV Shows`,
								isDisabled: isLoading.tv
						  }
						: undefined,
					mediaTypes.includes('person')
						? {
								label: `${title} People`,
								isDisabled: isLoading.person
						  }
						: undefined
				])
			}}
		>
			<>
				{!isLoading.movie && isError.movie ? (
					<Error
						label='Oh no! Something went wrong'
						description={`Failed to fetch ${title ? `"${title}"` : ''} movies list!`}
						variant='transparent'
					/>
				) : !isLoading.movie && isSuccess.movie && data.movie && data.movie.length === 0 ? (
					<Empty
						label='Oh no! Something went wrong'
						description={`${title ? `"${title}"` : ''} Movies list is currently empty!`}
						variant='transparent'
					/>
				) : !isLoading.movie && isSuccess.movie && data.movie && data.movie.length > 0 ? (
					data.movie.map((movie: PartialMovie) => (
						<VerticalMoviePoster key={movie.id} width={width} movie={movie} isLoading={false} />
					))
				) : (
					range(0, 20).map((_dummy, index: number) => (
						<VerticalMoviePoster key={index} width={width} isLoading />
					))
				)}
			</>

			<>
				{!isLoading.tv && isError.tv ? (
					<Error
						label='Oh no! Something went wrong'
						description={`Failed to fetch ${title ? `"${title}"` : ''} TV Shows list!`}
						variant='transparent'
					/>
				) : !isLoading.tv && isSuccess.tv && data.tv && data.tv.length === 0 ? (
					<Empty
						label={`${title ? `"${title}"` : ''} TV Shows list is currently empty!`}
						variant='transparent'
					/>
				) : !isLoading.tv && isSuccess.tv && data.tv && data.tv.length > 0 ? (
					data.tv.map((show: PartialTV) => (
						<VerticalTVShowPoster key={show.id} width={width} show={show} isLoading={false} />
					))
				) : (
					range(0, 20).map((_dummy, index: number) => (
						<VerticalTVShowPoster key={index} width={width} isLoading />
					))
				)}
			</>

			<>
				{!isLoading.person && isError.person ? (
					<Error
						label='Oh no! Something went wrong'
						description={`Failed to fetch ${title ? `"${title}"` : ''} people list!`}
						variant='transparent'
					/>
				) : !isLoading.person && isSuccess.person && data.person && data.person.length === 0 ? (
					<Empty
						label={`${title ? `"${title}"` : ''} People list is currently empty!`}
						variant='transparent'
					/>
				) : !isLoading.person && isSuccess.person && data.person && data.person.length > 0 ? (
					data.person.map((person: PartialPerson) => (
						<VerticalPersonPoster key={person.id} width={width} person={person} isLoading={false} />
					))
				) : (
					range(0, 20).map((_dummy, index: number) => (
						<VerticalPersonPoster key={index} width={width} isLoading />
					))
				)}
			</>
		</HorizontalTabbedGrid>
	);
});

export default HomeHorizontalGrid;
