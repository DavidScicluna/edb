import { FC } from 'react';

import { Headline, Skeleton, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import ViewHeroDummyTagline from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroDummyTagline';
import ViewHeroDummyPlot from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroDummyPlot';
import ViewHeroDummyGenres from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroDummyGenres';
import spacing from '../../../../common/data/spacing';
import { DummyRating } from '../../../../../../../../../components';
import QuickViewModalTVShowDummyActions from '../QuickViewModalTVShowDummyActions';

const QuickViewModalTVShowDummyContent: FC = () => {
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
							TV Show Name
						</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>First air-date was released on ddd, MMMM DD, YYYY</Text>
					</Skeleton>
				)}
			/>

			<QuickViewModalTVShowDummyActions />

			<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
				<ViewHeroDummyTagline />

				<ViewHeroDummyPlot />

				<ViewHeroDummyGenres />
			</VStack>
		</VStack>
	);
};

export default QuickViewModalTVShowDummyContent;
