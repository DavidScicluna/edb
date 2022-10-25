import { FC } from 'react';

import { Tag, TagLabel, TagDeleteIconButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../common/hooks';

import { CertificationsProps } from './types';

const Certifications: FC<CertificationsProps> = ({ certifications, onClick, onDelete }) => {
	const { color, colorMode } = useUserTheme();

	return (
		<Tag
			color={color}
			colorMode={colorMode}
			isClickable={!!onClick}
			onClick={onClick ? () => onClick() : undefined}
			variant='outlined'
		>
			<TagLabel>
				{`Certification${certifications.length === 1 ? '' : 's'}: ${certifications.join(', ')}`}
			</TagLabel>
			{!!onDelete && <TagDeleteIconButton onDelete={() => onDelete()} />}
		</Tag>
	);
};

export default Certifications;
