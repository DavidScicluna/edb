import { FC } from 'react';

import { useTheme, Button, ScaleFade, utils } from '@davidscicluna/component-library';

import { VStack, Text, Progress } from '@chakra-ui/react';

import CountUp from 'react-countup';
import { round } from 'lodash';

import { useUserTheme } from '../../../common/hooks';

import { LoadMoreProps } from './types';

const { getColor } = utils;

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

	return (
		<VStack width='100%' spacing={spacing}>
			<VStack width='100%' spacing={0.5}>
				<Text align='center' fontSize='sm' color={getColor({ theme, colorMode, type: 'text.secondary' })}>
					{amount >= total ? (
						<CountUp duration={1} end={total} prefix={`You've viewed all `} suffix={` ${label}`} />
					) : (
						<>
							<CountUp duration={1} end={amount} prefix={`You've viewed `} suffix=' of ' />
							<CountUp duration={1} end={total} suffix={` ${label}`} />
						</>
					)}
				</Text>
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
