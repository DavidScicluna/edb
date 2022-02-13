import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Panel from '../../../../components/Panel';
import Cover from './components/Cover';
import Overview from './components/Overview';
import Tagline from './components/Tagline';
import { HeroProps } from './types';

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

            {(!_.isNil(tagline) && !_.isEmpty(tagline)) || isLoading ? (
              <Tagline tagline={tagline} isLoading={isLoading} />
            ) : null}

            {(!_.isNil(overview) && !_.isEmpty(overview)) || isLoading ? (
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
