import { ReactElement } from 'react';

import { CardRef, useTheme, Card, CardBody, Radio } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, VStack, Text, Box } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';

import { ListItemProps } from './types';

const ListItem = (props: ListItemProps): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const [ref, { width }] = useElementSize<NonNullable<CardRef>>();

	const { id, label, results, isSelected = false, onSelected, onClick } = props;

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [isHoveringRadio, setIsHoveringRadio] = useBoolean();

	const movies = results.movies.length;
	const tv = results.tv.length;

	const transition = `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`;

	return (
		<Card
			ref={ref}
			// color={isSelected ? color : 'gray'}
			color={isSelected ? 'blue' : 'gray'}
			isFullWidth
			// isFixed={isHoveringRadio}
			isClickable
			onClick={!isHoveringRadio ? () => onClick(id) : undefined}
			sx={{ back: { height: `${width}px` } }}
		>
			<CardBody>
				<VStack
					position='relative'
					width='100%'
					height='100%'
					alignItems='center'
					justifyContent='center'
					spacing={0}
				>
					<Box position='absolute' top={theme.space[2]} left={theme.space[2]}>
						<Radio
							// color={color}
							color='blue'
							isChecked={isSelected}
							onMouseEnter={() => setIsHoveringRadio.on()}
							onMouseLeave={() => setIsHoveringRadio.off()}
							onClick={() => onSelected(id)}
						/>
					</Box>
					<Text
						align='center'
						color={isSelected ? `${color}.400` : `gray.${colorMode === 'light' ? 900 : 50}`}
						fontSize='xl'
						fontWeight='semibold'
						isTruncated
						overflow='hidden'
						whiteSpace='nowrap'
						sx={{ transition }}
					>
						{label}
					</Text>
					<Text
						align='center'
						color={isSelected ? `${color}.400` : `gray.${colorMode === 'light' ? 400 : 500}`}
						fontSize='sm'
						fontWeight='400'
						textTransform='capitalize'
						isTruncated
						overflow='hidden'
						whiteSpace='nowrap'
						sx={{ transition }}
					>
						{`${[
							`${movies} movie${movies === 0 || movies > 1 ? 's' : ''}`,
							`${tv} TV show${tv === 0 || tv > 1 ? 's' : ''}`
						]
							.filter((item) => item)
							.join(' • ')}`}
					</Text>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default ListItem;
