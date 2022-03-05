import { ReactElement, forwardRef } from 'react';

import { ColorMode, useTheme, useColorMode, Tag as CUITag, HStack } from '@chakra-ui/react';

import _ from 'lodash';

import useStyles from './styles';
import { TagRef, TagProps } from './types';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../common/utils';
import { Theme, Space } from '../../../theme/types';
import Icon from '../../Icon';
import IconButton from '../IconButton';

const Tag = forwardRef<TagRef, TagProps>(function Tag(props, ref): ReactElement {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const {
		children,
		color = 'gray',
		colorMode: colorModeProp,
		renderLeft,
		renderRight,
		isClickable = false,
		isDisabled = false,
		isFullWidth = false,
		onDelete,
		size = 'md',
		variant = 'contained',
		sx,
		...rest
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const style = useStyles(theme, {
		color,
		isClickable,
		isFullWidth,
		isDeletable: !!onDelete,
		size,
		variant
	});

	/**
	 * This method will return the appropriate spacing depending on the size passed
	 *
	 * @returns - number: Spacing value
	 */
	const handleReturnSpacing = (): keyof Space => {
		switch (size) {
			case 'sm':
				return 0.5;
			case 'lg':
				return 2;
			default:
				return 1;
		}
	};

	/**
	 * This method will return the appropriate font-size in PX depending on size prop
	 *
	 * @returns - number: Font-size in PX
	 */
	const handleReturnIconSize = (): number => {
		switch (size) {
			case 'sm':
				return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xs, 'rem')) + 2;
			case 'lg':
				return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem')) + 3;
			default:
				return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.sm, 'rem')) + 2;
		}
	};

	const iconSize = `${handleReturnIconSize()}px`;

	return (
		<CUITag
			{...rest}
			ref={ref}
			variant='unstyled'
			sx={{ ..._.merge(style.tag.default, style.tag[size], style[colorMode][variant], sx) }}
			_disabled={{ ...style.tag.disabled }}
		>
			<HStack width='100%' spacing={handleReturnSpacing()}>
				{renderLeft
					? renderLeft({
							color,
							colorMode,
							width: iconSize,
							height: iconSize,
							fontSize: iconSize
					  })
					: null}
				<span className='tag_children'>{children}</span>
				{renderRight
					? renderRight({
							color,
							colorMode,
							width: iconSize,
							height: iconSize,
							fontSize: iconSize
					  })
					: null}
				{onDelete ? (
					<IconButton
						aria-label='Delete Tag'
						isDisabled={isDisabled}
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();

							onDelete();
						}}
						size={size}
						variant='icon'
					>
						<Icon icon='clear' type='outlined' />
					</IconButton>
				) : null}
			</HStack>
		</CUITag>
	);
});

export default Tag;
