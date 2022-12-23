import { FC } from 'react';

import { Wrap, WrapItem } from '@chakra-ui/react';

import { range } from 'lodash';

import ViewHeroLabel from '../ViewHeroLabel';

import { ViewHeroDummyKeywordsProps } from './types';
import ViewHeroDummyKeywordsKeyword from './components/ViewHeroDummyKeywordsKeyword';

const ViewHeroDummyKeywords: FC<ViewHeroDummyKeywordsProps> = (props) => {
	return (
		<ViewHeroLabel {...props} maxWidth='100%' label='Keywords'>
			<Wrap width='100%' spacing={1}>
				{range(5).map((_dummy, index) => (
					<WrapItem key={index}>
						<ViewHeroDummyKeywordsKeyword />
					</WrapItem>
				))}
			</Wrap>
		</ViewHeroLabel>
	);
};

export default ViewHeroDummyKeywords;
