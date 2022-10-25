import { FC } from 'react';

import { Button } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../common/hooks';

import { CertificationsCardActionsProps } from './types';

const CertificationsCardActions: FC<CertificationsCardActionsProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { allCertifications = 0, certifications = 0, onClear, onToggle } = props;

	return (
		<HStack spacing={1}>
			<Button
				color={color}
				colorMode={colorMode}
				isDisabled={allCertifications === 0 || certifications === 0 || certifications === allCertifications}
				onClick={() => onClear()}
				size='xs'
				variant='text'
			>
				Clear
			</Button>
			<Button
				color={color}
				colorMode={colorMode}
				isDisabled={allCertifications === 0}
				onClick={() => onToggle()}
				size='xs'
				variant='text'
			>
				{`${certifications === allCertifications ? 'Remove' : 'Select'} All`}
			</Button>
		</HStack>
	);
};

export default CertificationsCardActions;
