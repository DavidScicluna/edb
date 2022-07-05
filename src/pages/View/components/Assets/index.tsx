import { ReactElement } from 'react';

import {
	AccordionType,
	Accordions,
	AccordionsQuickToggles,
	AccordionsPanel,
	Accordion,
	AccordionHeader,
	AccordionBody,
	DummyAccordions,
	DummyQuickToggles,
	DummyAccordionsPanel,
	DummyAccordion,
	DummyAccordionHeader
} from '@davidscicluna/component-library';

import { useConst, Text } from '@chakra-ui/react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';

import { useSelector } from '../../../../common/hooks';
import { Image, Video } from '../../../../common/types';
import { defaultUser, getUser } from '../../../../store/slices/Users';

import Backdrops from './components/Backdrops';
import Posters from './components/Posters';
import Profiles from './components/Profiles';
import Videos from './components/Videos';
import { AssetsTabProps } from './types';

const Assets = (props: AssetsTabProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { alt, assets: assetsProp, isError = false, isSuccess = false, isLoading = true, onClickAsset } = props;

	const assets = useConst<AccordionType<(Image | Video)[]>[]>(
		compact([
			!(isNil(assetsProp?.profiles) || isEmpty(assetsProp?.profiles))
				? {
						id: 'profiles',
						title: 'Photos',
						data: [...(assetsProp?.profiles || [])]
						// total: {
						// 	number: assetsProp?.profiles?.length
						// },
						// isDisabled: (assetsProp?.profiles?.length || 0) === 0
				  }
				: undefined,
			!(isNil(assetsProp?.posters) || isEmpty(assetsProp?.posters))
				? {
						id: 'posters',
						title: 'Posters',
						data: [...(assetsProp?.posters || [])]
						// total: {
						// 	number: assetsProp?.posters?.length
						// },
						// isDisabled: (assetsProp?.posters?.length || 0) === 0
				  }
				: undefined,
			!(isNil(assetsProp?.backdrops) || isEmpty(assetsProp?.backdrops))
				? {
						id: 'backdrops',
						title: 'Backdrops',
						data: [...(assetsProp?.backdrops || [])]
						// total: {
						// 	number: assetsProp?.backdrops?.length
						// },
						// isDisabled: (assetsProp?.backdrops?.length || 0) === 0
				  }
				: undefined,
			!(isNil(assetsProp?.videos) || isEmpty(assetsProp?.videos))
				? {
						id: 'videos',
						title: 'Videos',
						data: [...(assetsProp?.videos || [])]
						// total: {
						// 	number: assetsProp?.videos?.length
						// },
						// isDisabled: (assetsProp?.videos?.length || 0) === 0
				  }
				: undefined
		])
	);

	return !isLoading ? (
		<Accordions<(Image | Video)[]> accordions={[...assets]}>
			<AccordionsQuickToggles<(Image | Video)[]> color={color} />

			<AccordionsPanel<(Image | Video)[]>>
				{({ accordions }) =>
					accordions.map(({ id, title }) => (
						<Accordion
							key={id}
							id={id}
							header={
								<AccordionHeader
									renderTitle={(props) => <Text {...props}>{title}</Text>}
									// TODO: Add CountUp Actions
									// total: {
									// 	number: season.episode_count || undefined,
									// 	suffix: season.episode_count ? ' episodes' : 'Confirmed'
									// },
								/>
							}
							body={
								<AccordionBody>
									{id === 'profiles' ? (
										<Profiles
											alt={alt}
											profiles={assetsProp?.profiles || []}
											isError={isError}
											isSuccess={isSuccess}
											isLoading={isLoading}
											onClickImage={(path) => onClickAsset(path, 'image')}
										/>
									) : id === 'posters' ? (
										<Posters
											alt={alt}
											posters={assetsProp?.posters || []}
											isError={isError}
											isSuccess={isSuccess}
											isLoading={isLoading}
											onClickImage={(path) => onClickAsset(path, 'image')}
										/>
									) : id === 'backdrops' ? (
										<Backdrops
											alt={alt}
											backdrops={assetsProp?.backdrops || []}
											isError={isError}
											isSuccess={isSuccess}
											isLoading={isLoading}
											onClickImage={(path) => onClickAsset(path, 'image')}
										/>
									) : (
										<Videos
											alt={alt}
											videos={assetsProp?.videos || []}
											isError={isError}
											isSuccess={isSuccess}
											isLoading={isLoading}
											onClickVideo={(videoId) => onClickAsset(videoId, 'video')}
										/>
									)}
								</AccordionBody>
							}
							spacing={2}
							p={2}
						/>
					))
				}
			</AccordionsPanel>
		</Accordions>
	) : (
		<DummyAccordions accordions={range(4)}>
			<DummyQuickToggles color={color} />

			<DummyAccordionsPanel>
				{({ accordions }) =>
					accordions.map((dummy) => (
						<DummyAccordion key={dummy} p={2}>
							{/* // TODO: Add Dummy CountUp Actions */}
							<DummyAccordionHeader hasSubtitle />
						</DummyAccordion>
					))
				}
			</DummyAccordionsPanel>
		</DummyAccordions>
	);
};

export default Assets;
