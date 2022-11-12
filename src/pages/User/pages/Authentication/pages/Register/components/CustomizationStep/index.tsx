import { FC } from 'react';

import UserThemeCustomization from '../../../../../../../../components/User/UserThemeCustomization';

import { CustomizationStepProps } from './types';

const CustomizationStep: FC<CustomizationStepProps> = (props) => {
	return <UserThemeCustomization {...props} />;
};

export default CustomizationStep;
