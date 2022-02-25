import { ReactElement } from 'react';

import { Fade, useColorMode, useTheme } from '@chakra-ui/react';

import _ from 'lodash';

import Link from './components/Link';
import { LinksProps } from './types';

import {
	facebook as FacebookIcon,
	twitter as TwitterIcon,
	instagram as InstagramIcon,
	imdb as ImdbIcon
} from '../../../../common/assets/icons';
import { useSelector } from '../../../../common/hooks';
import Icon from '../../../../components/Icon';
import { Theme } from '../../../../theme/types';

const Links = (props: LinksProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const color = useSelector((state) => state.user.ui.theme.color);

	const { alt, socials, isLoading = true, isDisabled = false } = props;

	return !isLoading ? (
		<>
			{/* Facebook */}
			<Fade in={!_.isNil(socials?.facebook_id) && !_.isEmpty(socials?.facebook_id)} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} Facebook link`}
					color='#4267B2' // Facebook Logo Color
					href={`https://www.facebook.com/${socials?.facebook_id}`}
					icon={<FacebookIcon />}
					isDisabled={isDisabled}
				/>
			</Fade>

			{/* Twitter */}
			<Fade in={!_.isNil(socials?.twitter_id) && !_.isEmpty(socials?.twitter_id)} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} Twitter link`}
					color='#1DA1F2' // Twitter Logo Color
					href={`https://www.twitter.com/${socials?.twitter_id}`}
					icon={<TwitterIcon />}
					isDisabled={isDisabled}
				/>
			</Fade>

			{/* Instagram */}
			<Fade in={!_.isNil(socials?.instagram_id) && !_.isEmpty(socials?.instagram_id)} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} Instagram link`}
					color={theme.colors[color][colorMode === 'light' ? 400 : 500]}
					href={`https://www.instagram.com/${socials?.instagram_id}`}
					icon={<InstagramIcon />}
					isDisabled={isDisabled}
				/>
			</Fade>

			{/* IMDB */}
			<Fade in={!_.isNil(socials?.imdb_id) && !_.isEmpty(socials?.imdb_id)} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} IMDB link`}
					color='#F5C518' // IMDB Logo Color
					href={`https://www.imdb.com/alt/${socials?.imdb_id}`}
					icon={<ImdbIcon />}
					isDisabled={isDisabled}
				/>
			</Fade>

			{/* Homepage */}
			<Fade in={!_.isNil(socials?.homepage_id) && !_.isEmpty(socials?.homepage_id)} unmountOnExit>
				<Link
					aria-label={`${alt ? `"${alt}"` : ''} Homepage link`}
					color={theme.colors[color][colorMode === 'light' ? 400 : 500]}
					href={socials?.homepage_id || ''}
					icon={<Icon icon='language' type='outlined' />}
					isDisabled={isDisabled}
				/>
			</Fade>
		</>
	) : (
		<>
			{_.range(0, 4).map((_dummy, index) => (
				<Link key={index} isDisabled />
			))}
		</>
	);
};

export default Links;
