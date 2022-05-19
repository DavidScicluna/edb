import { ReactElement } from 'react';

import {Button} from '@davidscicluna/component-library';

import { ColorMode, useColorMode, useMediaQuery, VStack, Text, Progress, ScaleFade } from '@chakra-ui/react';

import CountUp from 'react-countup';



import { LoadMoreProps } from './types';


const LoadMore = (props: LoadMoreProps): ReactElement => {
	const { colorMode: colorModeHook } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const {
		amount = 0,
		total = 0,
		label,
		color = 'gray',
		isLoading = false,
		isButtonVisible = true,
		onClick,
		buttonProps
	} = props;
	const { colorMode: colorModeProp, isDisabled = false, variant = 'outlined', ...rest } = buttonProps || {};

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<VStack width={isSm ? '100%' : 'auto'} spacing={3}>
			<VStack width='100%'>
				<Text align='center' fontSize='sm' color={`gray.${colorMode === 'light' ? 400 : 500}`}>
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
					background={`gray.${colorMode === 'light' ? 200 : 700}`}
					borderRadius='full'
					size='sm'
					value={Math.round((amount / total) * 100)}
					sx={{ '& div': { backgroundColor: `${color}.${colorMode === 'light' ? 500 : 400}` } }}
				/>
			</VStack>

			<ScaleFade in={isButtonVisible && amount < total} unmountOnExit style={{ width: '100%' }}>
				<Button
					{...rest}
					color={color}
					colorMode={colorMode}
					isDisabled={isDisabled || amount >= total}
					isLoading={isLoading}
					isFullWidth
					onClick={() => onClick()}
					variant={variant}
				>
					Load more
				</Button>
			</ScaleFade>
		</VStack>
	);
};

export default LoadMore;
