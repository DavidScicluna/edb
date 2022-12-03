import { FC } from 'react';

import SocialIconButton from '../SocialIconButton';
import { instagram as InstagramIcon } from '../../../../../../common/assets/icons';
import { CommonViewSocialsProps as InstagramIconButtonProps } from '../../common/types';

const InstagramIconButton: FC<InstagramIconButtonProps> = ({ id }) => {
	return (
		<SocialIconButton href={`https://www.instagram.com/${id}`} type='instagram'>
			<InstagramIcon />
		</SocialIconButton>
	);
};

export default InstagramIconButton;
