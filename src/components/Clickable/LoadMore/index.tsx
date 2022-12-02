import { FC } from 'react';

import { useTheme, Button, Skeleton, ScaleFade, utils } from '@davidscicluna/component-library';

import { VStack, Text, Progress } from '@chakra-ui/react';

import { round } from 'lodash';
import numbro from 'numbro';

import { useUserTheme } from '../../../common/hooks';

import { LoadMoreProps } from './types';

const { getColor } = utils;

// TODO: Go over all numbers and see what can be formatted with numbro

const LoadMore: FC<LoadMoreProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const {
		amount = 0,
		total = 0,
		label,
		isDisabled = false,
		isLoading = false,
		isButtonVisible = true,
		onClick,
		variant = 'outlined',
		spacing = 2,
		...rest
	} = props;

	const handleFormatNumber = (num: number): string => {
		return numbro(num).format({ thousandSeparated: true });
	};

	return (
		<VStack width='100%' spacing={spacing}>
			<VStack width='100%' spacing={0.5}>
				<Skeleton colorMode={colorMode} isLoaded={!isLoading} variant='text'>
					<Text align='center' fontSize='sm' color={getColor({ theme, colorMode, type: 'text.secondary' })}>
						{amount >= total
							? `You've viewed all ${handleFormatNumber(total)} ${label}`
							: `You've viewed ${handleFormatNumber(amount)} of ${handleFormatNumber(total)} ${label}`}
					</Text>
				</Skeleton>
				<Progress
					width='100%'
					height={theme.space[1]}
					borderRadius='full'
					background={getColor({ theme, colorMode, type: 'divider' })}
					isIndeterminate={isLoading}
					value={round((amount / total) * 100)}
					sx={{
						'& div': {
							backgroundImage: 'none',
							backgroundColor: getColor({ theme, colorMode, color, type: 'color' })
						}
					}}
				/>
			</VStack>

			<ScaleFade in={isButtonVisible && amount < total} style={{ width: '100%' }}>
				<Button
					{...rest}
					color={color}
					colorMode={colorMode}
					isDisabled={isDisabled || amount >= total}
					isLoading={isLoading}
					isFullWidth
					onClick={onClick ? () => onClick() : undefined}
					variant={variant}
				>
					Load more
				</Button>
			</ScaleFade>
		</VStack>
	);
};

export default LoadMore;
