import { FC } from 'react';

import { useLocation } from 'react-router';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';
import FooterInternalLink from '../FooterInternalLink';
import FooterExternalLink from '../FooterExternalLink';

const { getColor } = utils;

const FooterDescription: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const location = useLocation();

	return (
		<Text align='left' color={getColor({ theme, colorMode, type: 'text.secondary' })} fontSize='sm'>
			<FooterInternalLink to='/' isDisabled={location.pathname === '/'} sx={{ fontWeight: 'medium' }}>
				The Entertainment Database (EDB)
			</FooterInternalLink>{' '}
			is a web application that offers information related to the entertainment industry powered by{' '}
			<FooterExternalLink href='https://www.themoviedb.org/' sx={{ fontWeight: 'medium' }}>
				themoviedb
			</FooterExternalLink>
			. Such information can be anything from{' '}
			<FooterInternalLink to='/movies' isDisabled={location.pathname === '/movies'} sx={{ fontWeight: 'medium' }}>
				Movies
			</FooterInternalLink>
			,{' '}
			<FooterInternalLink
				to='/tvshows'
				isDisabled={location.pathname === '/tvshows'}
				sx={{ fontWeight: 'medium' }}
			>
				TV Shows
			</FooterInternalLink>
			, and the{' '}
			<FooterInternalLink to='/people' isDisabled={location.pathname === '/people'} sx={{ fontWeight: 'medium' }}>
				People
			</FooterInternalLink>{' '}
			that make it happen. EDB offers users the ability to view all the information,{' '}
			<FooterInternalLink to='/likes' isDisabled={location.pathname === '/likes'} sx={{ fontWeight: 'medium' }}>
				like
			</FooterInternalLink>
			, and save it into a{' '}
			<FooterInternalLink to='/lists' isDisabled={location.pathname === '/lists'} sx={{ fontWeight: 'medium' }}>
				list
			</FooterInternalLink>
			. Every piece of data found in EDB is the latest and most updated content in relation to the entertainment
			industry, ensuring users with trustworthy content.
		</Text>
	);
};

export default FooterDescription;
