import { FC } from 'react';

import { useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { Center, Stat as CUIStat, StatNumber, StatLabel } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';

import { DummyStatProps } from './types';

const { getColor } = utils;

const DummyStat: FC<DummyStatProps> = ({ label }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<CUIStat width='100%'>
			<Center width='100%' flexDirection='column'>
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<StatNumber
						fontSize='3xl'
						fontWeight='medium'
						lineHeight='shorter'
						textTransform='uppercase'
						noOfLines={1}
					>
						####
					</StatNumber>
				</Skeleton>
				<StatLabel
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					fontSize='xs'
					lineHeight='shorter'
					textTransform='uppercase'
					noOfLines={1}
				>
					{label}
				</StatLabel>
			</Center>
		</CUIStat>
	);
};

export default DummyStat;
