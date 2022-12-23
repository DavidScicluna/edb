import { FC } from 'react';

import { Wrap, WrapItem } from '@chakra-ui/react';

import ViewHeroLabel from '../ViewHeroLabel';

import { ViewHeroKeywordsProps } from './types';
import ViewHeroKeywordsKeyword from './components/ViewHeroKeywordsKeyword';

const ViewHeroKeywords: FC<ViewHeroKeywordsProps> = ({ mediaType, keywords = [], ...rest }) => {
	return (
		<ViewHeroLabel {...rest} maxWidth='100%' label='Keywords'>
			<Wrap width='100%' spacing={1}>
				{keywords.map(({ id, name }) => (
					<WrapItem key={id}>
						<ViewHeroKeywordsKeyword mediaType={mediaType} id={id} name={name} />
					</WrapItem>
				))}
			</Wrap>
		</ViewHeroLabel>
	);
};

export default ViewHeroKeywords;
