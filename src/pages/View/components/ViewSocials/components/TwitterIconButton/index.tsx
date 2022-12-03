import { FC } from 'react';

import SocialIconButton from '../SocialIconButton';
import { twitter as TwitterIcon } from '../../../../../../common/assets/icons';
import { CommonViewSocialsProps as TwitterIconButtonProps } from '../../common/types';

const TwitterIconButton: FC<TwitterIconButtonProps> = ({ id }) => {
	return (
		<SocialIconButton href={`https://www.twitter.com/${id}`} type='twitter'>
			<TwitterIcon />
		</SocialIconButton>
	);
};

export default TwitterIconButton;
