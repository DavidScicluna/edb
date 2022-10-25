import { FC } from 'react';

import {
	useTheme,
	Card,
	CardBody,
	ButtonGroup,
	ButtonGroupItem,
	Button,
	SlideFade
} from '@davidscicluna/component-library';

import { useMediaQuery, useConst, Text } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import compact from 'lodash/compact';
import range from 'lodash/range';
import { round, toString } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
import { getIsFiltersFormNumbersInList, getFiltersFormNumbers } from '../../common/utils';
import FiltersFormCardHeader from '../FiltersFormCardHeaders';
import defaultValues from '../../../common/data/defaults';
import { CommonFiltersFormProps as RuntimeRangeProps } from '../../common/types';
import { getFontSizeHeight } from '../../../../../common/utils';

const RuntimeRange: FC<RuntimeRangeProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const { control, setValue } = form;

	const runtimes = useConst(range(0, 475, 45));

	return (
		<Controller
			control={control}
			name='runtime'
			render={({ field: { onBlur, value, name } }) => (
				<Card colorMode={colorMode} isFullWidth onBlur={onBlur} p={2}>
					<FiltersFormCardHeader
						title='Runtime Range'
						subtitle=''
						renderMessage={({ fontSize, ...rest }) => (
							<SlideFade
								in={value.length > 0}
								offsetY={round(getFontSizeHeight({ theme, fontSize }) / 4)}
							>
								<Text {...rest} fontSize={fontSize}>
									{value.map((runtime) => `${runtime} minutes`).join(' -> ')}
								</Text>
							</SlideFade>
						)}
						renderButton={(props) => (
							<Button
								{...props}
								isDisabled={value.length === 0}
								onClick={() => setValue(name, defaultValues.runtime, { shouldDirty: true })}
							>
								Clear
							</Button>
						)}
					/>
					<CardBody>
						<ButtonGroup sx={{ width: '100%', flexWrap: isMd ? 'wrap' : 'nowrap' }}>
							{runtimes.map((runtime, index) => (
								<ButtonGroupItem
									key={runtime}
									index={index}
									total={runtimes.length - 1}
									sx={{ flex: isMd ? 1 : undefined, width: isMd ? `${100 / 6}%` : 'auto' }}
								>
									<Button
										color={
											getIsFiltersFormNumbersInList({ list: compact(value), number: runtime })
												? color
												: 'gray'
										}
										colorMode={colorMode}
										isFullWidth
										onClick={() =>
											setValue(
												name,
												getFiltersFormNumbers({ list: compact(value), number: runtime }),
												{ shouldDirty: true }
											)
										}
										variant={value.some((num) => num === runtime) ? 'contained' : 'outlined'}
									>
										{toString(runtime)}
									</Button>
								</ButtonGroupItem>
							))}
						</ButtonGroup>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default RuntimeRange;
