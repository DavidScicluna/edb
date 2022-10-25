import { FC } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import DummyCertification from '../DummyCertification';
import { useUserTheme } from '../../../../../../../common/hooks';

import { CertificationProps } from './types';

const Certification: FC<CertificationProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { certification, isActive = false, onClick } = props;

	return certification ? (
		<Button
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			renderRight={
				isActive
					? ({ colorMode, height }) => (
							<Icon
								colorMode={colorMode}
								width={`${height}px`}
								height={`${height}px`}
								fontSize={`${height}px`}
								icon='check'
								category='outlined'
							/>
					  )
					: undefined
			}
			onClick={() => onClick()}
			variant='outlined'
		>
			{certification}
		</Button>
	) : (
		<DummyCertification />
	);
};

export default Certification;
