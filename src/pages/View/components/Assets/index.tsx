import { ReactElement } from 'react';

import { useConst } from '@chakra-ui/react';

import { compact, isNil, isEmpty, range } from 'lodash';

import Backdrops from './components/Backdrops';
import Posters from './components/Posters';
import Profiles from './components/Profiles';
import Videos from './components/Videos';
import { AssetsTabProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { Image, Video } from '../../../../common/types';
import Accordions from '../../../../components/Accordions';
import { Accordion } from '../../../../components/Accordions/types';

const Assets = (props: AssetsTabProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	const { alt, assets: assetsProp, isError = false, isSuccess = false, isLoading = true, onClickAsset } = props;

	const assets = useConst<Accordion<(Image | Video)[]>[]>(
		compact([
			!(isNil(assetsProp?.profiles) || isEmpty(assetsProp?.profiles)) || isLoading
				? {
						id: 'profiles',
						title: 'Photos',
						total: {
							number: assetsProp?.profiles?.length
						},
						isDisabled: (assetsProp?.profiles?.length || 0) === 0
				  }
				: undefined,
			!(isNil(assetsProp?.posters) || isEmpty(assetsProp?.posters)) || isLoading
				? {
						id: 'posters',
						title: 'Posters',
						total: {
							number: assetsProp?.posters?.length
						},
						isDisabled: (assetsProp?.posters?.length || 0) === 0
				  }
				: undefined,
			!(isNil(assetsProp?.backdrops) || isEmpty(assetsProp?.backdrops)) || isLoading
				? {
						id: 'backdrops',
						title: 'Backdrops',
						total: {
							number: assetsProp?.backdrops?.length
						},
						isDisabled: (assetsProp?.backdrops?.length || 0) === 0
				  }
				: undefined,
			!(isNil(assetsProp?.videos) || isEmpty(assetsProp?.videos)) || isLoading
				? {
						id: 'videos',
						title: 'Videos',
						total: {
							number: assetsProp?.videos?.length
						},
						isDisabled: (assetsProp?.videos?.length || 0) === 0
				  }
				: undefined
		])
	);

	return (
		<Accordions
			accordions={
				!isLoading && isSuccess && assets && assets.length > 0
					? [...assets]
					: range(0, 4).map((_dummy, index: number) => {
							return {
								id: `${index}`,
								title: `Asset ${index + 1}`,
								isDisabled: true
							};
					  })
			}
			renderAccordion={({ id }) =>
				id === 'profiles' ? (
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
				)
			}
			color={color}
			isLoading={isLoading}
			isError={isError}
		/>
	);
};

export default Assets;
