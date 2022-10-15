import { FC, useRef, useMemo, useEffect } from 'react';

import { useLocation } from 'react-router';

import { useTheme, Form, Input, Icon, Fade, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useBoolean, useConst, HStack } from '@chakra-ui/react';

import { Controller, useWatch } from 'react-hook-form';
import { debounce } from 'lodash';
import qs from 'query-string';
import { useEffectOnce } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../common/hooks';
import { isFocused as defaultIsFocused } from '../../../../common/data/defaultPropValues';

import SearchInputActions from './components/SearchInputActions';
import SearchInputSearchTypes from './components/SearchInputSearchTypes';
import { SearchInputProps } from './types';
import { getPlaceholder } from './common/utils';

const { getColor } = utils;

const SearchInput: FC<SearchInputProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const location = useLocation();

	const {
		form,
		isDisabled = false,
		isFocused = defaultIsFocused,
		onFocus,
		onBlur,
		onClearQuery,
		onSubmitQuery
	} = props;
	const { control, setValue, handleSubmit } = form;

	const watchQuery = useWatch({ control, name: 'query' });
	const watchSearchTypes = useWatch({ control, name: 'searchTypes' });

	const [isSubmitDisabled, setIsSubmitDisabled] = useBoolean(isDisabled);

	const placeholder = useConst<string>(getPlaceholder({ searchTypes: watchSearchTypes }));

	const handleActionsState = useMemo(
		() =>
			debounce((): void => {
				const search = qs.parse(location.search);
				const query = search && search.query && typeof search.query === 'string' ? search.query : '';

				setIsSubmitDisabled[isDisabled || query === watchQuery ? 'on' : 'off']();
			}, 500),
		[location, watchQuery, isDisabled]
	);

	const handleInputIsFocused = useMemo(
		() =>
			debounce((): void => {
				if (inputRef && inputRef.current) {
					if (isFocused) {
						inputRef.current.focus();
					} else {
						inputRef.current.blur();
					}
				}
			}, 500),
		[inputRef, isFocused]
	);

	useEffect(() => handleActionsState(), [location, watchQuery, isDisabled]);

	useEffect(() => handleInputIsFocused(), [isFocused]);

	useEffectOnce(() => {
		return () => {
			handleActionsState.cancel();
			handleInputIsFocused.cancel();
		};
	});

	return (
		<Form onSubmit={handleSubmit((values) => onSubmitQuery({ ...values }))}>
			<HStack
				width='100%'
				minHeight='30px' // Size of SearchTypes
				justifyContent='space-between'
				spacing={0}
			>
				<HStack flex={1} spacing={1}>
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
						render={({ field: { onChange, value, name } }) => (
							<Input
								color={color}
								colorMode={colorMode}
								autoComplete='off'
								id={name}
								name={name}
								placeholder={`Try "${placeholder}"`}
								isDisabled={isDisabled}
								isFocused={isFocused}
								onFocus={onFocus}
								onBlur={onBlur}
								onChange={onChange}
								value={value}
								variant='transparent'
								sx={{ group: { height: '100%', px: 0, py: 0 } }}
							/>
						)}
					/>
				</HStack>

				<SearchInputActions
					hasQuery={watchQuery.length > 0}
					isDisabled={isDisabled}
					isSubmitDisabled={isSubmitDisabled}
					onClear={onClearQuery}
				/>
			</HStack>
		</Form>
	);
};

export default SearchInput;
