import { FC } from 'react';

import { Colors, useTheme, utils } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { omit } from 'lodash';

import ViewAvatar from '../../../../../components/ViewAvatar';
import { getBoringAvatarSrc, getBoringAvatarVariantByMediaType, getImageSize } from '../../../../../../../common/utils';
import { useUserTheme } from '../../../../../../../common/hooks';

import { PersonAvatarProps } from './types';

const { getHue } = utils;

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const PersonAvatar: FC<PersonAvatarProps> = ({ person, onClick, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { id, name, profile_path } = person;

	const randomID = useConst<string>(uuid());

	return (
		<ViewAvatar
			{...rest}
			alt={name ? `${name || ''} person poster` : 'Person poster'}
			onClick={onClick}
			src={{
				boring: getBoringAvatarSrc({
					id: id ? String(id) : randomID,
					colors: omit({ ...theme.colors }, ['transparent', 'black', 'white']) as Colors,
					hue: getHue({ colorMode, type: 'color' }),
					size: 500,
					variant: getBoringAvatarVariantByMediaType({ mediaType: 'person' })
				}),
				thumbnail: `${import.meta.env.VITE_IMAGE_URL}/${thumbnail}${profile_path}`,
				full: `${import.meta.env.VITE_IMAGE_URL}/${full}${profile_path}`
			}}
		/>
	);
};

export default PersonAvatar;
