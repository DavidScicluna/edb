import { FC } from 'react';

import { useLocation } from 'react-router';

import { useTheme, InternalLink, Divider, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Stack, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';

import { useUserTheme } from '../../../../../../common/hooks';
import { Logo } from '../../../../../../components';

import FooterNavigation from './components/FooterNavigation';
import FooterExternalLink from './components/FooterExternalLink';
import FooterDescription from './components/FooterDescription';

const { getColor } = utils;

const Footer: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const location = useLocation();

	return (
		<VStack
			width='100%'
			alignItems='stretch'
			justifyContent='stretch'
			divider={<Divider />}
			background={getColor({ theme, colorMode, type: colorMode })}
			spacing={4}
			p={4}
		>
			<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={4}>
				<InternalLink to='/' isDisabled={location.pathname === '/'}>
					<Logo isClickable={false} isSquare size='md' />
				</InternalLink>

				<FooterDescription />
			</VStack>

			<FooterNavigation />

			<Stack width='100%' direction={isSm ? 'column' : 'row'} justifyContent='space-between' spacing={2}>
				<FooterExternalLink href='https://www.themoviedb.org/' sx={{ fontSize: 'sm', fontWeight: 'medium' }}>
					Powered by themoviedb
				</FooterExternalLink>

				<Text
					align='center'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					fontSize='sm'
					fontWeight='medium'
				>
					{`© ${dayjs(new Date()).format('YYYY')} EDB, All rights reserved.`}
				</Text>

				<FooterExternalLink href='https://davidscicluna.com' sx={{ fontSize: 'sm', fontWeight: 'medium' }}>
					Made by davidscicluna.com
				</FooterExternalLink>
			</Stack>
		</VStack>
	);
};

export default Footer;
