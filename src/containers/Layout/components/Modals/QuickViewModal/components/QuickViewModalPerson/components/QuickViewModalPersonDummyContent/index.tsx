import { FC } from 'react';

import { useTheme, Headline, Skeleton, Divider } from '@davidscicluna/component-library';

import { VStack, HStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import spacing from '../../../../common/data/spacing';
import QuickViewModalPersonDummyActions from '../QuickViewModalPersonDummyActions';
import ViewHeroLabel from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroLabel';
import { getFontSizeHeight } from '../../../../../../../../../common/utils';
import ViewHeroText from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroText';
import { DummyStats } from '../../../../../../../../../components';

const QuickViewModalPersonDummyContent: FC = () => {
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
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props} fontSize='5xl'>
							Person Name
						</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<HStack width='100%' divider={<Text {...props}>•</Text>} spacing={0.75}>
						{range(3).map((_dummy, index) => (
							<Skeleton key={index} colorMode={colorMode} isLoaded={false} variant='text'>
								<Text {...props}>Department</Text>
							</Skeleton>
						))}
					</HStack>
				)}
			/>
			<QuickViewModalPersonDummyActions />

			<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
				<ViewHeroLabel label='Biography'>
					<VStack
						width='100%'
						alignItems='flex-start'
						justifyContent='center'
						spacing={`${getFontSizeHeight({ theme, fontSize: 'md', lineHeight: 'shorter' }) / 2}px`}
					>
						{range(3).map((_dummy, index) => (
							<Skeleton key={index} width='100%' colorMode={colorMode} isLoaded={false} variant='text'>
								<ViewHeroText fontWeight='normal'>Biography</ViewHeroText>
							</Skeleton>
						))}
					</VStack>
				</ViewHeroLabel>

				<ViewHeroLabel label='Credits'>
					<DummyStats
						dummyStats={[{ label: 'Cast' }, { label: 'Movies' }, { label: 'TV Shows' }, { label: 'Crew' }]}
						isFullWidth
						spacing={1}
					/>
				</ViewHeroLabel>
			</VStack>
		</VStack>
	);
};

export default QuickViewModalPersonDummyContent;
