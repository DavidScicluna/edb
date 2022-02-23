import { ReactElement } from 'react';

import { useTheme, useColorMode, useBoolean, VStack, Text, Box } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { ListItemProps } from './types';

import { useSelector } from '../../../../../../../../common/hooks';
import Card from '../../../../../../../../components/Clickable/Card';
import { CardRef } from '../../../../../../../../components/Clickable/Card/types';
import Radio from '../../../../../../../../components/Forms/Radio';
import { Theme } from '../../../../../../../../theme/types';

const ListItem = (props: ListItemProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const [ref, { width }] = useElementSize<NonNullable<CardRef>>();

	const { id, label, results, isSelected = false, onSelected, onClick } = props;

	const color = useSelector((state) => state.user.ui.theme.color);

	const [isHoveringRadio, setIsHoveringRadio] = useBoolean();

	const movies = results.movies.length;
	const tv = results.tv.length;

	const transition = `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`;

	return (
		<Card
			ref={ref}
			color={isSelected ? color : 'gray'}
			isFullWidth
			isFixed={isHoveringRadio}
			isClickable
			onClick={!isHoveringRadio ? () => onClick(id) : undefined}
			sx={{ back: { height: `${width}px` } }}
		>
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
						color={color}
						isChecked={isSelected}
						onMouseEnter={() => setIsHoveringRadio.on()}
						onMouseLeave={() => setIsHoveringRadio.off()}
						onClick={() => onSelected(id)}
					/>
				</Box>
				<Text
					align='center'
					color={isSelected ? `${color}.400` : colorMode === 'light' ? 'gray.900' : 'gray.50'}
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
					color={isSelected ? `${color}.400` : colorMode === 'light' ? 'gray.400' : 'gray.500'}
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
		</Card>
	);
};

export default ListItem;
