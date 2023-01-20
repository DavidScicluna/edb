import { FC } from 'react';

import { useTheme, Headline, Skeleton, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import spacing from '../../../../common/data/spacing';
import { DummyRating } from '../../../../../../../../../components';
import QuickViewModalCollectionDummyActions from '../QuickViewModalCollectionDummyActions';
import ViewHeroLabel from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroLabel';
import { getFontSizeHeight } from '../../../../../../../../../common/utils';
import ViewHeroText from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroText';

const QuickViewModalCollectionDummyContent: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<VStack
			width='100%'
			height='100%'
			alignItems='stretch'
			justifyContent='center'
			divider={<Divider colorMode={colorMode} />}
			spacing={spacing}
		>
			<Headline
				width='100%'
				renderCaption={() => <DummyRating size='2xl' />}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props} fontSize='5xl'>
							Collection Title
						</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>
							First Movie was released on ddd, MMMM DD, YYYY and last Movie was released on ddd, MMMM DD,
							YYYY
						</Text>
					</Skeleton>
				)}
			/>

			<QuickViewModalCollectionDummyActions />

			<ViewHeroLabel label='Summary'>
				<VStack
					width='100%'
					alignItems='flex-start'
					justifyContent='center'
					spacing={`${getFontSizeHeight({ theme, fontSize: 'md', lineHeight: 'shorter' }) / 2}px`}
				>
					{range(3).map((_dummy, index) => (
						<Skeleton key={index} width='100%' colorMode={colorMode} isLoaded={false} variant='text'>
							<ViewHeroText fontWeight='normal'>Summary</ViewHeroText>
						</Skeleton>
					))}
				</VStack>
			</ViewHeroLabel>
		</VStack>
	);
};

export default QuickViewModalCollectionDummyContent;
