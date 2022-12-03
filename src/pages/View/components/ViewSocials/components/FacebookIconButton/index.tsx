import { FC } from 'react';

import SocialIconButton from '../SocialIconButton';
import { facebook as FacebookIcon } from '../../../../../../common/assets/icons';
import { CommonViewSocialsProps as FacebookIconButtonProps } from '../../common/types';

const FacebookIconButton: FC<FacebookIconButtonProps> = ({ id }) => {
	return (
		<SocialIconButton href={`https://www.facebook.com/${id}`} type='facebook'>
			<FacebookIcon />
		</SocialIconButton>
	);
};

export default FacebookIconButton;
