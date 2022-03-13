import React, { ReactElement, useContext, useCallback } from 'react';

import { useMediaQuery, Stack, HStack, Center } from '@chakra-ui/react';

import Cancel from './components/Cancel';
import Next from './components/Next';
import Step from './components/Step';
import { Status } from './components/Step/types';
import { StepListProps, Step as StepType } from './types';

import { StepperContext } from '../../.';
import Divider from '../../../Divider';
import HorizontalScroll from '../../../HorizontalScroll';
import { StepperContext as StepperContextType } from '../../types';

export const height = '100px';

const StepList = (props: StepListProps): ReactElement => {
	const {
		activeStep = 0,
		color,
		colorMode,
		onChange,
		onCancel,
		onSubmit
	} = useContext<StepperContextType>(StepperContext);

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { children = [] } = props;

	const handleNext = (): void => {
		if (activeStep === children.length - 1) {
			onSubmit();
		} else {
			onChange(activeStep + 1);
		}
	};

	const handleChange = (index: number): void => {
		if (onChange && activeStep !== index) {
			onChange(index);
		}
	};

	const handleReturnStepStatus = useCallback(
		(index: number, step: StepType): Status => {
			if (activeStep === index) {
				return 'active';
			} else {
				switch (step.status) {
					case 'success':
						return 'success';
					case 'error':
						return 'error';
					case 'warning':
						return 'warning';
					default:
						return 'idle';
				}
			}
		},
		[activeStep]
	);

	return (
		<Stack width='100%' direction={isSm ? 'column' : 'row'} spacing={0}>
			{isSm ? (
				<>
					<HStack
						width='100%'
						justifyContent='stretch'
						divider={<Divider colorMode={colorMode} orientation='vertical' height={height} />}
						spacing={0}
					>
						<Cancel color={color} colorMode={colorMode} onCancel={onCancel} />
						<Next
							color={color}
							colorMode={colorMode}
							isLast={activeStep === children.length - 1}
							onNext={handleNext}
						/>
					</HStack>
					<Center width={isSm ? '100%' : 'calc(100% - 200px)'}>
						<HorizontalScroll
							isFullWidth
							renderDivider={() => (
								<Divider colorMode={colorMode} orientation='vertical' height={height} />
							)}
						>
							{children.map((step, index) => (
								<Step
									{...step}
									key={index}
									index={index}
									color={color}
									colorMode={colorMode}
									status={handleReturnStepStatus(index, step)}
									onClick={() => handleChange(index)}
								/>
							))}
						</HorizontalScroll>
					</Center>
				</>
			) : (
				<>
					<Cancel color={color} colorMode={colorMode} onCancel={onCancel} />
					<Center width='calc(100% - 200px)'>
						<HorizontalScroll
							isFullWidth
							renderDivider={() => (
								<Divider colorMode={colorMode} orientation='vertical' height={height} />
							)}
						>
							{children.map((step, index) => (
								<Step
									{...step}
									key={index}
									index={index}
									color={color}
									colorMode={colorMode}
									status={handleReturnStepStatus(index, step)}
									onClick={() => handleChange(index)}
								/>
							))}
						</HorizontalScroll>
					</Center>
					<Next
						color={color}
						colorMode={colorMode}
						isLast={activeStep === children.length - 1}
						onNext={handleNext}
					/>
				</>
			)}
		</Stack>
	);
};

export default StepList;
