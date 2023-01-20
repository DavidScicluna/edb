import { FC, useState, useEffect } from 'react';

import { Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import { compact } from 'lodash';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatDate, formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import QuickViewModalCollectionActions from '../QuickViewModalCollectionActions';
import spacing from '../../../../common/data/spacing';
import { getCollectionFirstLastParts } from '../../../../../../../../../pages/View/pages/Collections/OriginalCollection/common/utils';
import ViewHeroLabel from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroLabel';
import ViewHeroText from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroText';

import { QuickViewModalCollectionContentProps } from './types';

const today = formatDate({ date: dayjs(new Date()).toISOString(), section: 'year' });

const QuickViewModalCollectionContent: FC<QuickViewModalCollectionContentProps> = ({ collection }) => {
	const { colorMode } = useUserTheme();

	const { name, overview, parts = [] } = collection;

	const [date, setDate] = useState<string>();

	const handleGetFirstLastParts = (): void => {
		const { first, last } = getCollectionFirstLastParts({ parts });

		setDate(
			compact([
				first && first.release_date
					? `First ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} ${
							today < formatDate({ date: first.release_date, section: 'year' }) ? 'will be' : 'was'
					  } released on ${formatDate({
							date: first.release_date
					  })}`
					: null,
				last && last.release_date
					? `Last ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} ${
							today < formatDate({ date: last.release_date, section: 'year' }) ? 'will be' : 'was'
					  } released on ${formatDate({
							date: last.release_date
					  })}`
					: first && first.release_date
					? 'Present'
					: null,
				parts.length > 0
					? `${formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })} has a total of ${
							parts.length
					  } ${formatMediaTypeLabel({
							type: parts.length === 1 ? 'single' : 'multiple',
							mediaType: 'movie'
					  })}`
					: null
			]).join(' and ')
		);
	};

	useEffect(() => handleGetFirstLastParts(), [parts]);

	return (
		<VStack
			width='100%'
			height='100%'
			alignItems='stretch'
			justifyContent='center'
			divider={<Divider colorMode={colorMode} />}
			spacing={spacing}
		>
			<Headline
				width='100%'
				renderTitle={(props) => (
					<Text {...props} fontSize='5xl'>
						{name}
					</Text>
				)}
				renderSubtitle={date ? (props) => <Text {...props}>{date}</Text> : undefined}
			/>

			<QuickViewModalCollectionActions collection={collection} />

			{overview && (
				<ViewHeroLabel label='Summary'>
					<ViewHeroText whiteSpace='normal' noOfLines={3}>
						{overview}
					</ViewHeroText>
				</ViewHeroLabel>
			)}
		</VStack>
	);
};

export default QuickViewModalCollectionContent;
