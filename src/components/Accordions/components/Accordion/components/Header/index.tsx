import { ReactElement } from 'react';
import CountUp from 'react-countup';

import { useTheme, useColorMode, HStack, VStack, Fade } from '@chakra-ui/react';

import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import Subtitle from './components/Subtitle';
import Title from './components/Title';
import useStyles from './styles';
import { HeaderProps } from './types';

import { Theme } from '../../../../../../theme/types';
import Badge from '../../../../../Badge';

const Header = <D,>(props: HeaderProps<D>): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const [ref, { width }] = useElementSize();

	const {
		title,
		subtitle,
		total,
		color,
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
			sx={{ ..._.merge(style.header, style[colorMode]) }}
			_disabled={style.disabled}
		>
			<VStack
				width={`calc(100% - ${width + 16}px)`}
				alignItems='flex-start'
				spacing={isLoading && subtitle ? 0.5 : 0}
			>
				<Title title={title} isLoading={isLoading} inView={inView} />
				{subtitle ? <Subtitle subtitle={subtitle} isLoading={isLoading} inView={inView} /> : null}
			</VStack>

			<HStack ref={ref}>
				{/* TODO: Replace color with prop color */}
				<Fade in={!_.isNil(total) && !_.isEmpty(total) && inView} unmountOnExit>
					<Badge color={isOpen ? color : 'gray'} size='md'>
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

				<ChevronRightOutlinedIcon />
			</HStack>
		</HStack>
	);
};

export default Header;
