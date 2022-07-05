import { ReactElement } from 'react';

import { useTheme, Icon } from '@davidscicluna/component-library';

import { Fade, useColorMode } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';

import {
	facebook as FacebookIcon,
	twitter as TwitterIcon,
	instagram as InstagramIcon,
	imdb as ImdbIcon
} from '../../../../common/assets/icons';
import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';

import { LinksProps } from './types';
import Link from './components/Link';

const Links = (props: LinksProps): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { alt, socials, isLoading = true, isDisabled = false } = props;

	return !isLoading ? (
		<>
			{/* Facebook */}
			<Fade in={!(isNil(socials?.facebook_id) || isEmpty(socials?.facebook_id))} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} Facebook link`}
					color='#4267B2' // Facebook Logo Color
					href={`https://www.facebook.com/${socials?.facebook_id}`}
					icon={<FacebookIcon />}
					isDisabled={isDisabled}
				/>
			</Fade>

			{/* Twitter */}
			<Fade in={!(isNil(socials?.twitter_id) || isEmpty(socials?.twitter_id))} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} Twitter link`}
					color='#1DA1F2' // Twitter Logo Color
					href={`https://www.twitter.com/${socials?.twitter_id}`}
					icon={<TwitterIcon />}
					isDisabled={isDisabled}
				/>
			</Fade>

			{/* Instagram */}
			<Fade in={!(isNil(socials?.instagram_id) || isEmpty(socials?.instagram_id))} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} Instagram link`}
					color={theme.colors[color][colorMode === 'light' ? 400 : 500]}
					href={`https://www.instagram.com/${socials?.instagram_id}`}
					icon={<InstagramIcon />}
					isDisabled={isDisabled}
				/>
			</Fade>

			{/* IMDB */}
			<Fade in={!(isNil(socials?.imdb_id) || isEmpty(socials?.imdb_id))} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} IMDB link`}
					color='#F5C518' // IMDB Logo Color
					href={`https://www.imdb.com/alt/${socials?.imdb_id}`}
					icon={<ImdbIcon />}
					isDisabled={isDisabled}
				/>
			</Fade>

			{/* Homepage */}
			<Fade in={!(isNil(socials?.homepage_id) || isEmpty(socials?.homepage_id))} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} Homepage link`}
					color={theme.colors[color][colorMode === 'light' ? 400 : 500]}
					href={socials?.homepage_id || ''}
					icon={<Icon icon='language' category='outlined' />}
					isDisabled={isDisabled}
				/>
			</Fade>
		</>
	) : (
		<>
			{range(0, 4).map((_dummy, index) => (
				<Link key={index} isDisabled />
			))}
		</>
	);
};

export default Links;
