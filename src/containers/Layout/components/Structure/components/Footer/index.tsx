import { FC, useContext } from 'react';

import { useLocation } from 'react-router';

import { useTheme, Skeleton, InternalLink, Divider, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Stack, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';

import { useUserTheme } from '../../../../../../common/hooks';
import { Logo } from '../../../../../../components';
import { LayoutContext } from '../../../..';
import { spacing as defaultSpacing } from '../../../../common/data/defaultPropValues';
import { LayoutContext as LayoutContextType } from '../../../../types';

import FooterNavigation from './components/FooterNavigation';
import FooterExternalLink from './components/FooterExternalLink';
import FooterDescription from './components/FooterDescription';
import FooterDummyNavigation from './components/FooterDummyNavigation';
import FooterDummyDescription from './components/FooterDummyDescription';
import { FooterProps } from './types';

const { getColor } = utils;

const Footer: FC<FooterProps> = ({ isDummy = false }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing = defaultSpacing } = useContext<LayoutContextType>(LayoutContext);

	const location = useLocation();

	return (
		<VStack
			width='100%'
			alignItems='stretch'
			justifyContent='stretch'
			divider={<Divider />}
			background={getColor({ theme, colorMode, type: colorMode })}
			spacing={spacing}
			p={spacing}
		>
			<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
				<Skeleton colorMode={colorMode} isLoaded={!isDummy} variant='rectangle'>
					<InternalLink to='/' isDisabled={location.pathname === '/'}>
						<Logo isClickable={false} isSquare size='md' />
					</InternalLink>
				</Skeleton>

				{!isDummy ? <FooterDescription /> : <FooterDummyDescription />}
			</VStack>

			{!isDummy ? <FooterNavigation /> : <FooterDummyNavigation />}

			<Stack
				width='100%'
				direction={isSm ? 'column' : 'row'}
				alignItems='center'
				justifyContent='space-between'
				spacing={2}
			>
				<Skeleton colorMode={colorMode} isLoaded={!isDummy} variant='text'>
					<FooterExternalLink
						href='https://www.themoviedb.org/'
						sx={{ fontSize: 'sm', fontWeight: 'medium' }}
					>
						Powered by themoviedb
					</FooterExternalLink>
				</Skeleton>

				<Skeleton colorMode={colorMode} isLoaded={!isDummy} variant='text'>
					<Text
						align='center'
						color={getColor({ theme, colorMode, type: 'text.secondary' })}
						fontSize='sm'
						fontWeight='medium'
					>
						{`© ${dayjs(new Date()).format('YYYY')} EDB, All rights reserved.`}
					</Text>
				</Skeleton>

				<Skeleton colorMode={colorMode} isLoaded={!isDummy} variant='text'>
					<FooterExternalLink href='https://davidscicluna.com' sx={{ fontSize: 'sm', fontWeight: 'medium' }}>
						Made by davidscicluna.com
					</FooterExternalLink>
				</Skeleton>
			</Stack>
		</VStack>
	);
};

export default Footer;
