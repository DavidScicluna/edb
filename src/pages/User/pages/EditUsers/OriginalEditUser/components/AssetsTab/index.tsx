import { FC } from 'react';

import { useFormState, useWatch } from 'react-hook-form';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../common/data/defaultPropValues';
import { useSelector } from '../../../../../../../common/hooks';
import EditUserStructure from '../EditUserStructure';
import UserUpdateAssets from '../../../../../components/UserUpdateAssets';

import { AssetsTabProps } from './types';

const AssetsTab: FC<AssetsTabProps> = (props) => {
	const {
		info: { avatar_path, background_path },
		credentials: { username }
	} = useSelector((state) => state.users.data.activeUser.data);

	const { color = defaultColor, colorMode = defaultColorMode, form, firstName, lastName, onSubmit } = props;
	const { control, reset, handleSubmit } = form;

	const watchAvatarPath = useWatch({ control, name: 'avatar_path' });
	const watchBackgroundPath = useWatch({ control, name: 'background_path' });

	const { isDirty } = useFormState({ control });

	// usePrompt({
	// 	title: 'Unsubmitted Changes!',
	// 	subtitle:
	// 'Are you sure you want to cancel editing the Avatar & Background? Once you close the page you will not be able to retrieve the changed data!',
	// 	when: isDirty
	// });

	const handleClear = (): void => {
		reset({ avatar_path, background_path });
	};

	return (
		<EditUserStructure
			color={color}
			colorMode={colorMode}
			title='Avatar & Background'
			subtitle='Upload an avatar & background of your choice!'
			isSubmitDisabled={!isDirty}
			onReset={
				avatar_path !== watchAvatarPath || background_path !== watchBackgroundPath ? handleClear : undefined
			}
			onSubmit={handleSubmit(onSubmit)}
		>
			<UserUpdateAssets
				color={color}
				colorMode={colorMode}
				form={form}
				firstName={firstName}
				lastName={lastName}
				username={username}
			/>
		</EditUserStructure>
	);
};

export default AssetsTab;
