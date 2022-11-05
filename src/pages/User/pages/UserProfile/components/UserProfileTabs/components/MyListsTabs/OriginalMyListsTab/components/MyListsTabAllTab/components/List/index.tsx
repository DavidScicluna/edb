import { FC } from 'react';

import { useTheme, Card, CardBody, Radio, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { useBoolean, VStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../../../../../../../common/hooks';

import { ListProps } from './types';

const { getColor } = utils;

const List: FC<ListProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [cardRef, { width: cardWidth }] = useElementSize();

	const { list, isDisabled = false, isSelected = false, onSelectList, onListClick } = props;
	const {
		label,
		mediaItems: { movie = [], tv = [] }
	} = list;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Card
			ref={cardRef}
			color={isSelected ? color : 'gray'}
			isClickable={!isDisabled}
			isFullWidth
			isFixed={!isDisabled && isHovering}
			isLight={!isSelected}
			onClick={!isDisabled && !isHovering ? () => onListClick() : undefined}
		>
			<CardBody>
				<VStack
					position='relative'
					width='100%'
					height={`${cardWidth}px`}
					alignItems='center'
					justifyContent='center'
					spacing={0.5}
				>
					<Center
						position='absolute'
						top={theme.space[1]}
						left={theme.space[1]}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
					>
						<Radio
							aria-label='Select list'
							color={color}
							colorMode={colorMode}
							id={label}
							name={label}
							isChecked={isSelected}
							onChange={() => onSelectList()}
							size='xs'
							variant='transparent'
						/>
					</Center>

					<Text
						align='center'
						color={!isSelected ? getColor({ theme, colorMode, type: 'text.primary' }) : undefined}
						fontSize='xl'
						fontWeight='semibold'
						lineHeight='shorter'
						noOfLines={1}
					>
						{label}
					</Text>

					{(movie.length > 0 || tv.length > 0) && (
						<Badge color={color} colorMode={colorMode} size='xs'>
							<BadgeLabel>
								{`${movie.length + tv.length} ${
									movie.length + tv.length === 1 ? 'Bookmark' : 'Bookmarks'
								}`}
							</BadgeLabel>
						</Badge>
					)}
				</VStack>
			</CardBody>
		</Card>
	);
};

export default List;
