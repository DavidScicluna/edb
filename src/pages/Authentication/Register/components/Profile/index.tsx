import React, { ReactElement } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, VStack } from '@chakra-ui/react';
import { useEffectOnce } from 'usehooks-ts';

import { handleReturnBoringSrc } from '../../../../../common/utils';

import Avatar from './components/Avatar';
import Background from './components/Background';
import Details from './components/Details';
import { ProfileProps } from './types';

// TODO: Use Profile component with edit mode on

const Profile = (props: ProfileProps): ReactElement => {
	const theme = useTheme();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { id, form, user, color, colorMode, onChange } = props;

	const background = form.watch('background_path');
	const avatar = form.watch('avatar_path');

	const alt = `${user.firstName} ${user.lastName} (@${user.username})`;

	useEffectOnce(() => {
		form.setValue(
			'background_path',
			handleReturnBoringSrc(theme, 'sunset', colorMode === 'light' ? 500 : 400, id),
			{
				shouldDirty: true
			}
		);

		form.setValue('avatar_path', handleReturnBoringSrc(theme, 'beam', colorMode === 'light' ? 500 : 400, id), {
			shouldDirty: true
		});

		onChange();
	});

	return (
		<VStack
			width='100%'
			height='auto'
			alignItems='flex-end'
			position='relative'
			borderWidth='2px'
			borderStyle='solid'
			borderColor={`gray.${colorMode === 'light' ? 200 : 700}`}
			borderRadius='lg'
			overflow='hidden'
			spacing={isSm ? 4 : 0}
			p={isSm ? 2 : 0}
		>
			{!isSm ? (
				<Background color={color} colorMode={colorMode} alt={alt} form={form} background={background} />
			) : null}

			<Avatar color={color} colorMode={colorMode} alt={alt} form={form} avatar={avatar} />

			<Details colorMode={colorMode} user={user} />
		</VStack>
	);
};

export default Profile;
