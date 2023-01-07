import { FC } from 'react';

import {
	useTheme,
	DummyCard,
	DummyCardHeader,
	CardBody,
	CardFooter,
	Skeleton,
	utils
} from '@davidscicluna/component-library';

import { AspectRatio, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';

import { DummyParagraph, DummyRating } from '../../../../../../components';
import { useUserTheme } from '../../../../../../common/hooks';
import { formatDate } from '../../../../../../common/utils';
import { getRatio } from '../../../../../../common/utils/ratio';

const { getColor } = utils;

const ViewReviewsDummyReview: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader
				renderLeft={() => (
					<AspectRatio
						width={theme.fontSizes['5xl']}
						height={theme.fontSizes['5xl']}
						borderRadius='full'
						ratio={getRatio({ orientation: 'square' })}
					>
						<Skeleton colorMode={colorMode} isLoaded={false} variant='circle' />
					</AspectRatio>
				)}
				hasTitle
				hasSubtitle
				actions={<DummyRating size='xl' />}
				spacing={1.5}
			/>
			<CardBody>
				<DummyParagraph variant='transparent' />
			</CardBody>

			<CardFooter>
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text align='left' color={getColor({ theme, colorMode, type: 'text.secondary' })} fontSize='sm'>
						{`* Created on: ${formatDate({ date: dayjs(new Date()).toISOString() })}`}
					</Text>
				</Skeleton>
			</CardFooter>
		</DummyCard>
	);
};

export default ViewReviewsDummyReview;
