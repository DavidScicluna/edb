import { ReactElement, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useConst, VStack, Collapse } from '@chakra-ui/react';

import _ from 'lodash';
import { useEffectOnce } from 'usehooks-ts';

import Collections from './components/Collections';
import Companies from './components/Companies';
import People from './components/People';

import { useSelector } from '../../../../common/hooks';
import { MediaType } from '../../../../common/types';
import Divider from '../../../../components/Divider';
import Tabs from '../../../../components/Tabs';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import Page from '../../../../containers/Page';
import { MediaItems } from '../../../../store/slices/User/types';
import MediaTypesHeader from '../../components/MediaTypesHeader';
import MediaTypesPicker from '../../components/MediaTypesPicker';
import Movies from '../../components/Movies';
import TV from '../../components/TV';

const allMediaTypes: MediaType[] = ['movie', 'tv', 'person', 'company', 'collection'];

const handleReturnMediaTypes = ({ movies, tv, people, companies, collections }: MediaItems): MediaType[] => {
	const mediaTypes: MediaType[] = [];

	if (movies.length > 0) {
		mediaTypes.push('movie');
	}

	if (tv.length > 0) {
		mediaTypes.push('tv');
	}

	if (people.length > 0) {
		mediaTypes.push('person');
	}

	if (companies.length > 0) {
		mediaTypes.push('company');
	}

	if (collections.length > 0) {
		mediaTypes.push('collection');
	}

	return mediaTypes;
};

const Liked = (): ReactElement => {
	const liked = useSelector((state) => state.user.data.liked);

	const location = useLocation();
	const navigate = useNavigate();

	const mediaTypes = useConst<MediaType[]>(handleReturnMediaTypes(liked));

	const movies = useConst<MediaItems['movies']>(liked.movies);
	const tv = useConst<MediaItems['tv']>(liked.tv);
	const people = useConst<MediaItems['people']>(liked.people);
	const companies = useConst<MediaItems['companies']>(liked.companies);
	const collections = useConst<MediaItems['collections']>(liked.collections);

	const [activeTab, setActiveTab] = useState<number>();

	const handleCheckLocation = (): void => {
		const hash = location.hash.replace('#', '');

		switch (hash) {
			case 'movie':
				setActiveTab(0);
				return;
			case 'tv':
				setActiveTab(1);
				return;
			case 'person':
				setActiveTab(2);
				return;
			case 'company':
				setActiveTab(3);
				return;
			case 'collection':
				setActiveTab(4);
				return;
			default:
				setActiveTab(undefined);
				return;
		}
	};

	useEffect(() => {
		if (location.pathname === '/liked') {
			handleCheckLocation();
		}
	}, [location.hash]);

	useEffectOnce(() => {
		if (mediaTypes.length === 1) {
			setActiveTab(
				allMediaTypes.findIndex((allMediaType) => mediaTypes.some((mediaType) => mediaType === allMediaType))
			);
		}
	});

	return (
		<Page title='Liked'>
			{{
				body: (
					<Tabs
						activeTab={activeTab}
						onChange={(index: number) => navigate({ pathname: '.', hash: allMediaTypes[index] })}
					>
						<VStack
							width='100%'
							divider={mediaTypes.length > 0 ? <Divider orientation='horizontal' /> : undefined}
							spacing={2}
							p={2}
						>
							<Collapse in={mediaTypes.length > 0} unmountOnExit style={{ width: '100%' }}>
								<MediaTypesHeader
									activeTab={activeTab}
									total={{
										movie: movies.length,
										tv: tv.length,
										person: people.length,
										company: companies.length,
										collection: collections.length
									}}
								/>
							</Collapse>

							{_.isNil(activeTab) || _.isNil(mediaTypes) || _.isEmpty(mediaTypes) ? (
								<MediaTypesPicker
									mediaTypes={mediaTypes}
									label='Oh no! 😢'
									description='Please like an item to view it in the liked list.'
									onSetMediaType={(mediaType: MediaType) =>
										navigate({ pathname: '.', hash: mediaType })
									}
								/>
							) : (
								<TabPanels>
									<Movies movies={movies} />
									<TV shows={tv} />
									<People people={people} />
									<Companies companies={companies} />
									<Collections collections={collections} />
								</TabPanels>
							)}
						</VStack>
					</Tabs>
				)
			}}
		</Page>
	);
};

export default Liked;
