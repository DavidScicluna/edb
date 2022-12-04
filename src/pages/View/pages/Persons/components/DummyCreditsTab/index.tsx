import { FC } from 'react';

import { Headline, Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { TabItemStructure } from '../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../common/utils';

import Tabs from './components/DummyCreditsTabTabs';

const DummyCreditsTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	return (
		<TabItemStructure
			status='loading'
			headline={
				<Headline
					width='100%'
					renderCaption={() => (
						// TODO: Replace with DummyBadge
						<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='text'>
							<Badge color={color} colorMode={colorMode} size='xs'>
								<BadgeLabel>Person has a total of # Credits</BadgeLabel>
							</Badge>
						</Skeleton>
					)}
					renderTitle={(props) => (
						<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
							<Text {...props}>Credits</Text>
						</Skeleton>
					)}
					renderSubtitle={(props) => (
						<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
							<Text {...props}>
								{`This Tab contains all the ${formatMediaTypeLabel({
									type: 'multiple',
									mediaType: 'movie'
								})} & ${formatMediaTypeLabel({
									type: 'multiple',
									mediaType: 'tv'
								})} that the person was part of during their career and also contains their upcoming credits in the years to come.`}
							</Text>
						</Skeleton>
					)}
				/>
			}
			dummy={<Tabs />}
			empty={<div />}
			multiple={<div />}
			single={<div />}
		/>
	);
};

export default DummyCreditsTab;
