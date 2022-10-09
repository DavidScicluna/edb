import { FC } from 'react';

import { useTheme, Form, Icon, Fade, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useConst, HStack, Input } from '@chakra-ui/react';

import { Controller, useWatch } from 'react-hook-form';

import { useUserTheme } from '../../../../../../../common/hooks';

import SearchInputActions from './components/SearchInputActions';
import SearchInputSearchTypes from './components/SearchInputSearchTypes';
import { SearchInputProps } from './types';
import { getPlaceholder } from './common/utils';

const { getColor } = utils;

const SearchInput: FC<SearchInputProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { form, isDisabled = false, onFocus, onBlur, onClearQuery, onSubmitQuery } = props;
	const { control, setValue, handleSubmit } = form;

	const watchQuery = useWatch({ control, name: 'query' });
	const watchSearchTypes = useWatch({ control, name: 'searchTypes' });

	const placeholder = useConst<string>(getPlaceholder({ searchTypes: watchSearchTypes }));

	return (
		<Form onSubmit={handleSubmit((values) => onSubmitQuery({ ...values }))}>
			<HStack
				width='100%'
				minHeight='30px' // Size of SearchTypes
				justifyContent='space-between'
				spacing={0}
			>
				<HStack flex={1}>
					<Icon
						width={theme.fontSizes['3xl']}
						height={theme.fontSizes['3xl']}
						fontSize={theme.fontSizes['3xl']}
						color={getColor({ theme, colorMode, type: 'text.secondary' })}
						colorMode={colorMode}
						icon='search'
					/>

					{!isSm && (
						<Controller
							control={control}
							name='searchTypes'
							render={({ field: { value = [], name } }) => (
								<Fade in={value.length > 0}>
									<SearchInputSearchTypes
										searchTypes={value}
										onClear={() => setValue(name, [], { shouldDirty: true })}
									/>
								</Fade>
							)}
						/>
					)}

					<Controller
						control={control}
						name='query'
						render={({ field: { onChange, value, name, ref } }) => (
							<Input
								ref={ref}
								autoComplete='off'
								id={name}
								name={name}
								color={getColor({ theme, colorMode, type: 'text.primary' })}
								borderRadius='none'
								placeholder={`Try "${placeholder}"`}
								isDisabled={isDisabled}
								onFocus={onFocus}
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								variant='unstyled'
								sx={{
									'transition': 'none !important',
									'*, *::before, *::after': { transition: 'none !important' }
								}}
							/>
						)}
					/>
				</HStack>

				<SearchInputActions hasQuery={watchQuery.length > 0} isDisabled={isDisabled} onClear={onClearQuery} />
			</HStack>
		</Form>
	);
};

export default SearchInput;
