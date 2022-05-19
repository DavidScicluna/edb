import { ReactElement } from 'react';

import { useTheme, useMediaQuery, HStack, VStack, Fade } from '@chakra-ui/react';

import CountUp from 'react-countup';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import merge from 'lodash/merge';
import { useElementSize } from 'usehooks-ts';

import { Theme } from '../../../../../../theme/types';
import Badge from '../../../../../Badge';
import Icon from '../../../../../Icon';

import Subtitle from './components/Subtitle';
import Title from './components/Title';
import useStyles from './styles';
import { HeaderProps } from './types';


const Header = <D,>(props: HeaderProps<D>): ReactElement => {
	const theme = useTheme<Theme>();

	const [isSm] = useMediaQuery('(max-width: 600px)');
	const [isMd] = useMediaQuery('(max-width: 992px)');

	const [ref, { width }] = useElementSize();

	const {
		title,
		subtitle,
		total,
		color,
		colorMode,
		inView = false,
		isOpen = false,
		isDisabled = false,
		isLoading = true,
		onToggle
	} = props;

	const style = useStyles(theme, isOpen);

	return (
		<HStack
			aria-disabled={isDisabled}
			width='100%'
			justifyContent='space-between'
			onClick={!isDisabled ? () => onToggle() : undefined}
			spacing={2}
			sx={{ ...merge(style.header, style[colorMode]) }}
			_disabled={style.disabled}
		>
			<VStack
				width={`calc(100% - ${width + 16}px)`}
				alignItems='flex-start'
				spacing={isLoading && subtitle ? 0.5 : 0}
			>
				<Title title={title} isLoading={isLoading} inView={inView} colorMode={colorMode} />
				{subtitle ? (
					<Subtitle subtitle={subtitle} isLoading={isLoading} inView={inView} colorMode={colorMode} />
				) : null}
			</VStack>

			<HStack ref={ref}>
				<Fade in={!(isNil(total) || isEmpty(total)) && inView} unmountOnExit>
					<Badge
						color={isOpen ? color : 'gray'}
						colorMode={colorMode}
						size={isSm ? 'xs' : isMd ? 'sm' : 'md'}
					>
						{total?.number ? (
							<CountUp
								duration={1}
								prefix={total?.prefix || ''}
								end={total?.number || 0}
								suffix={total?.suffix || ''}
							/>
						) : (
							total?.prefix || total?.suffix || ''
						)}
					</Badge>
				</Fade>

				<Icon icon='chevron_right' type='outlined' fontSize={theme.fontSizes.xl} />
			</HStack>
		</HStack>
	);
};

export default Header;
