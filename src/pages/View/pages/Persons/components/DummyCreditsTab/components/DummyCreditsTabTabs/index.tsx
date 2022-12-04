import { FC } from 'react';

import { Tabs, DummyTabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import MediaTypeTab from '../DummyCreditsTabMediaTypeTab';
import { DummyTabIcon } from '../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../../../common/utils';

const DummyCreditsTabTabs: FC = () => {
	const { color, colorMode } = useUserTheme();

	return (
		<Tabs width='100%' color={color} colorMode={colorMode} size='lg'>
			<VStack width='100%' spacing={2}>
				<DummyTabList
					tabs={[
						{
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
							renderLeft: (props) => (
								<DummyTabIcon
									{...props}
									icon={getMediaTypeIcon({ mediaType: 'movie' })}
									category='outlined'
								/>
							)
						},
						{
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
							renderLeft: ({ colorMode }) => (
								<DummyTabIcon
									colorMode={colorMode}
									icon={getMediaTypeIcon({ mediaType: 'tv' })}
									category='outlined'
								/>
							)
						}
					]}
				/>

				<TabPanels>
					<MediaTypeTab />

					<MediaTypeTab />
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default DummyCreditsTabTabs;
