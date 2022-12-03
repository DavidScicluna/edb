import { FC } from 'react';

import { IconButtonIcon } from '@davidscicluna/component-library';

import SocialIconButton from '../SocialIconButton';
import { CommonViewSocialsProps as HomepageIconButtonProps } from '../../common/types';

const HomepageIconButton: FC<HomepageIconButtonProps> = ({ id }) => {
	return (
		<SocialIconButton href={`${id}`} type='homepage'>
			<IconButtonIcon icon='language' category='outlined' />
		</SocialIconButton>
	);
};

export default HomepageIconButton;
