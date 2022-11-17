import { FC } from 'react';

import { useFormState, useWatch } from 'react-hook-form';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../common/data/defaultPropValues';
import UserThemeCustomization from '../../../../../components/UserThemeCustomization';
import EditUserStructure from '../EditUserStructure';

import { CustomizationTabProps } from './types';

const CustomizationTab: FC<CustomizationTabProps> = (props) => {
	const { defaultUserTheme, form, color = defaultColor, colorMode = defaultColorMode, onSubmit } = props;
	const { control, reset, handleSubmit } = form;

	const watchColor = useWatch({ control, name: 'color' });
	const watchColorMode = useWatch({ control, name: 'colorMode' });

	const { isDirty } = useFormState({ control });

	const handleClear = (): void => {
		reset({ ...defaultUserTheme });
	};

	return (
		<EditUserStructure
			color={color}
			colorMode={colorMode}
			title='Customization'
			subtitle='Pick your favorite color and mode.'
			isSubmitDisabled={!isDirty}
			onReset={
				defaultUserTheme.color !== watchColor || defaultUserTheme.colorMode !== watchColorMode
					? handleClear
					: undefined
			}
			onSubmit={handleSubmit(onSubmit)}
		>
			<UserThemeCustomization form={form} color={color} colorMode={colorMode} />
		</EditUserStructure>
	);
};

export default CustomizationTab;
