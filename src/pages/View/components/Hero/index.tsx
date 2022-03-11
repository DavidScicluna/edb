import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import Cover from './components/Cover';
import Overview from './components/Overview';
import Tagline from './components/Tagline';
import { HeroProps } from './types';

import Panel from '../../../../components/Panel';

const Hero = (props: HeroProps): ReactElement => {
	const { renderPoster, renderBackdrop, renderDetails, tagline, overview, isLoading = true } = props;

	return (
		<Panel isFullWidth>
			{{
				body: (
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
				)
			}}
		</Panel>
	);
};

export default Hero;
