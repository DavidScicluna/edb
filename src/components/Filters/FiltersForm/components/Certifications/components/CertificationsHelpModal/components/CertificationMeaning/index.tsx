import { FC } from 'react';

import { useTheme, Card, CardHeader, CardBody, CardFooter, Button, utils } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import { upperCase } from 'lodash';

import { Certification as CertificationMeaningProps } from '../../../../../../../../../common/types';
import { useUserTheme } from '../../../../../../../../../common/hooks';

const { getColor } = utils;

const limit = 30;

const CertificationMeaning: FC<CertificationMeaningProps> = ({ certification, meaning = '' }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isExpanded, setIsExpanded] = useBoolean();

	return (
		<Card key={certification} colorMode={colorMode} isFullWidth p={2}>
			<CardHeader renderTitle={(props) => <Text {...props}>{upperCase(certification)}</Text>} />
			<CardBody justifyContent='flex-start'>
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize='md'
					noOfLines={isExpanded ? 0 : 3}
				>
					{meaning}
				</Text>
			</CardBody>
			{meaning.split(' ').length >= limit && !isExpanded && (
				<CardFooter>
					<Button
						color={color}
						colorMode={colorMode}
						isFullWidth
						onClick={() => setIsExpanded.toggle()}
						size='xs'
						variant='text'
					>
						{`Read ${isExpanded ? 'Less' : 'More'}`}
					</Button>
				</CardFooter>
			)}
		</Card>
	);
};

export default CertificationMeaning;
