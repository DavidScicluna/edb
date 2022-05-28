import { ReactElement } from 'react';

import { Card, CardBody } from '@davidscicluna/component-library';
import { VStack } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import Cover from './components/Cover';
import Overview from './components/Overview';
import Tagline from './components/Tagline';
import { HeroProps } from './types';

const Hero = (props: HeroProps): ReactElement => {
	const { renderPoster, renderBackdrop, renderDetails, tagline, overview, isLoading = true } = props;

	return (
		<Card isFullWidth>
			<CardBody>
				<VStack position='relative' alignItems='stretch' spacing={2}>
					<Cover>
						{{
							poster: renderPoster(),
							backdrop: renderBackdrop()
						}}
					</Cover>

					{!(isNil(tagline) || isEmpty(tagline)) || isLoading ? (
						<Tagline tagline={tagline} isLoading={isLoading} />
					) : null}

					{!(isNil(overview) || isEmpty(overview)) || isLoading ? (
						<Overview overview={overview} isLoading={isLoading} />
					) : null}

					{renderDetails()}
				</VStack>
			</CardBody>
		</Card>
	);
};

export default Hero;
