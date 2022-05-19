import { ReactElement } from 'react';

import {
	useTheme,
	useColorMode,
	useMediaQuery,
	useConst,
	HStack,
	VStack,
	AspectRatio,
	Center,
	Text,
	SlideFade
} from '@chakra-ui/react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import startCase from 'lodash/startCase';
import { useElementSize } from 'usehooks-ts';


import {
	handleConvertREMToPixels,
	handleConvertStringToNumber,
	handleReturnBoringTypeByMediaType,
	handleReturnRatio
} from '../../../../../../../../common/utils';
import Divider from '../../../../../../../../components/Divider';
import HorizontalScroll from '../../../../../../../../components/HorizontalScroll';
import Image from '../../../../../../../../components/Image';
import Rating from '../../../../../../../../components/Rating';
import Skeleton from '../../../../../../../../components/Skeleton';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../../../theme/types';

import { HeaderProps } from './types';

dayjs.extend(localizedFormat);

// TODO: Check if author is user and render header text differently

const Header = (props: HeaderProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [ref, { width, height }] = useElementSize();

	const { avatar_path, author, name, username, created_at, rating, isLoading = true } = props;

	const avatar = useConst<number>(
		handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes['6xl'], 'rem'))
	);

	/**
	 * This method will check if avatar url has a / in the beginning of the string
	 * If so it will remove it
	 *
	 * @returns string - Avatar URL
	 */
	const handleSrc = (): string => {
		if (avatar_path && avatar_path.charAt(0) === '/') {
			return avatar_path.substring(1);
		}
		return avatar_path || '';
	};

	const hasRating = !(isNil(rating) || isEmpty(rating)) || isLoading;

	return (
		<HStack
			width='100%'
			divider={hasRating && !isSm ? <Divider orientation='vertical' height={`${height}px`} /> : undefined}
			spacing={2}
		>
			<HStack
				width={`calc(100% - ${hasRating && !isSm ? width + 34 : 0}px)`}
				justifyContent='flex-start'
				spacing={2}
			>
				<AspectRatio minWidth={`${avatar}px`} borderRadius='full' ratio={handleReturnRatio('square')}>
					<Center as={Skeleton} borderRadius='full' isLoaded={!isLoading}>
						<Image
							alt={`${author || name} (${username}) Avatar`}
							borderRadius='full'
							boringType={handleReturnBoringTypeByMediaType('person')}
							thumbnailSrc={handleSrc() || ''}
							fullSrc={handleSrc() || ''}
						/>
					</Center>
				</AspectRatio>

				<VStack width={`calc(100% - ${avatar + 16}px)`} alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
					<SkeletonText isLoaded={!isLoading} fontSize={isSm ? 'xl' : '2xl'}>
						<Text
							align='left'
							color={`gray.${colorMode === 'light' ? 900 : 50}`}
							fontSize={isSm ? 'xl' : '2xl'}
							fontWeight='semibold'
							lineHeight='normal'
							isTruncated
							overflow='hidden'
							whiteSpace='nowrap'
						>
							{startCase(!isSm ? `Review by ${author || name}` : author || name)}
						</Text>
					</SkeletonText>
					<HorizontalScroll
						renderDivider={({ padding }) => (
							<Text
								align='left'
								color={`gray.${colorMode === 'light' ? 400 : 500}`}
								fontSize='sm'
								mx={padding}
							>
								•
							</Text>
						)}
					>
						{compact([
							<SkeletonText key='review_username' isLoaded={!isLoading} fontSize='sm'>
								<Text
									align='left'
									color={`gray.${colorMode === 'light' ? 400 : 500}`}
									fontSize='sm'
									isTruncated
									overflow='hidden'
									whiteSpace='nowrap'
								>
									{`@${username || 'username'}`}
								</Text>
							</SkeletonText>,
							created_at ? (
								<SkeletonText key='review_created_at' isLoaded={!isLoading} fontSize='sm'>
									<Text
										align='left'
										color={`gray.${colorMode === 'light' ? 400 : 500}`}
										fontSize='sm'
										isTruncated
										overflow='hidden'
										whiteSpace='nowrap'
									>
										{dayjs(created_at || new Date()).format('LLL')}
									</Text>
								</SkeletonText>
							) : undefined,
							hasRating && isSm ? (
								<Rating key='review_rating' size='sm' isLoading={isLoading}>
									{rating}
								</Rating>
							) : undefined
						])}
					</HorizontalScroll>
				</VStack>
			</HStack>

			<SlideFade in={hasRating && !isSm} unmountOnExit>
				<Rating ref={ref} size='2xl' isLoading={isLoading}>
					{rating}
				</Rating>
			</SlideFade>
		</HStack>
	);
};

export default Header;
