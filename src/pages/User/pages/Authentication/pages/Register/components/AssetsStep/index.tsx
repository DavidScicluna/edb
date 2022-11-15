import { FC } from 'react';

import { useOutletContext } from 'react-router';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';
import UserUpdateAssets from '../../../../../../components/UserUpdateAssets';
import { AuthenticationOutletContext } from '../../../../types';

import { AssetsStepProps } from './types';

const AssetsStep: FC<AssetsStepProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	const { form, firstName, lastName, username } = props;

	return (
		<UserUpdateAssets
			color={color}
			colorMode={colorMode}
			form={form}
			firstName={firstName}
			lastName={lastName}
			username={username}
		/>
	);
};

export default AssetsStep;
