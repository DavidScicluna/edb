import { FC } from 'react';

import { Divider } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useUserTheme } from '../../../../common/hooks';

import FacebookIconButton from './components/FacebookIconButton';
import HomepageIconButton from './components/HomepageIconButton';
import IMDBIconButton from './components/IMDBIconButton';
import InstagramIconButton from './components/InstagramIconButton';
import TwitterIconButton from './components/TwitterIconButton';
import { ViewSocialsProps } from './types';

const ViewSocials: FC<ViewSocialsProps> = ({ socials }) => {
	const { colorMode } = useUserTheme();

	const { facebook_id, twitter_id, instagram_id, imdb_id, homepage_id } = socials;

	return (
		<HStack alignItems='stretch' justifyContent='stretch' spacing={1} ml={1}>
			{/* TODO: Go over all Divider and confirm we are passing down colorMode */}
			<Divider colorMode={colorMode} orientation='vertical' my={0.5} />

			<HStack spacing={0}>
				{compact([
					facebook_id ? <FacebookIconButton id={facebook_id} /> : null,

					twitter_id ? <TwitterIconButton id={twitter_id} /> : null,

					instagram_id ? <InstagramIconButton id={instagram_id} /> : null,

					imdb_id ? <IMDBIconButton id={imdb_id} /> : null,

					homepage_id ? <HomepageIconButton id={homepage_id} /> : null
				])}
			</HStack>
		</HStack>
	);
};

export default ViewSocials;
