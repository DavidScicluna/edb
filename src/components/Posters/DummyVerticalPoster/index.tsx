import { ReactElement } from 'react';

import { DummyCard, CardBody, utils } from '@davidscicluna/component-library';

import { VStack, HStack } from '@chakra-ui/react';

import { merge } from 'lodash';

import { MediaType } from '../../../common/types';
import DummyRating from '../../Ratings/DummyRating';
import DummyPosterBookmark from '../components/DummyPosterBookmark';
import DummyPosterLike from '../components/DummyPosterLike';
import DummyPosterQuickview from '../components/DummyPosterQuickview';
import PosterGlass from '../components/PosterGlass';
import { useUserTheme } from '../../../common/hooks';

import { DummyVerticalPosterProps } from './types';
import DummyVerticalPosterImage from './components/DummyVerticalPosterImage';
import DummyVerticalPosterTitle from './components/DummyVerticalPosterTitle';
import DummyVerticalPosterSubtitle from './components/DummyVerticalPosterSubtitle';

const { checkIsTouchDevice } = utils;

const isTouchDevice: boolean = checkIsTouchDevice();

const DummyVerticalPoster = <MT extends MediaType>(props: DummyVerticalPosterProps<MT>): ReactElement => {
	const { colorMode } = useUserTheme();

	const { mediaType, hasSubtitle = false, isFullWidth = true, isLight = true, sx, ...rest } = props;

	return (
		<DummyCard
			{...rest}
			colorMode={colorMode}
			isFullWidth={isFullWidth}
			isLight={isLight}
			sx={merge({ alignItems: 'flex-start' }, sx)}
		>
			<CardBody>
				<VStack width='100%' position='relative' overflow='hidden' spacing={0}>
					<DummyVerticalPosterImage />

					<VStack width='100%' spacing={0.5} p={1}>
						{(mediaType === 'movie' || mediaType === 'tv') && (
							<HStack width='100%' justify='space-between' spacing={0}>
								<DummyRating size='sm' />

								<HStack spacing={0.5}>
									{isTouchDevice && <DummyPosterQuickview size='xs' />}

									<DummyPosterLike size='xs' />

									<DummyPosterBookmark size='xs' />
								</HStack>
							</HStack>
						)}

						<VStack width='100%' alignItems='flex-start' spacing={0.5}>
							<DummyVerticalPosterTitle />

							{hasSubtitle && <DummyVerticalPosterSubtitle />}
						</VStack>
					</VStack>

					{(mediaType === 'person' || mediaType === 'company' || mediaType === 'collection') && (
						<>
							{isTouchDevice && mediaType !== 'company' && (
								<PosterGlass position='absolute' top={1.5} left={1.5}>
									<DummyPosterQuickview size='xs' />
								</PosterGlass>
							)}

							<PosterGlass position='absolute' top={1.5} right={1.5}>
								<DummyPosterLike size='xs' />
							</PosterGlass>
						</>
					)}
				</VStack>
			</CardBody>
		</DummyCard>
	);
};

export default DummyVerticalPoster;
