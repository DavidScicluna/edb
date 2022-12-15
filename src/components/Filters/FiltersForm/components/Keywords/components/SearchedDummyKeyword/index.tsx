import { FC } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { Box, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../common/hooks';

import useStyles from './common/styles';

const SearchedDummyKeyword: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const style = useStyles({ theme, colorMode });

	return (
		<Box width='100%' sx={style.keyword}>
			<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
				<Text align='left' fontSize='lg' noOfLines={1}>
					Keyword
				</Text>
			</Skeleton>
		</Box>
	);
};

export default SearchedDummyKeyword;
