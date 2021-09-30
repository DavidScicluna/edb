import { ReactElement } from 'react';

import { useTheme, useColorMode, useBreakpointValue, Text } from '@chakra-ui/react';
import moment from 'moment';

import Card from '../../../../../../components/Card';
import Rating from '../../../../../../components/Rating';
import { Theme } from '../../../../../../theme/types';
import Body from './components/Body';
import Header from './components/Header';
import { ReviewProps } from './types';

const Review = (props: ReviewProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const iconFontsize = useBreakpointValue({
    'base': theme.fontSizes['2xl'],
    'sm': theme.fontSizes['2xl'],
    'md': theme.fontSizes['3xl'],
    'lg': theme.fontSizes['3xl'],
    'xl': theme.fontSizes['3xl'],
    '2xl': theme.fontSizes['3xl']
  });

  const { author, author_details, created_at, updated_at, content, isLoading = true } = props;

  const hasFooter = updated_at && !moment(updated_at).isSame(created_at);

  return (
    <Card
      box={{ header: { pb: 1.5 }, body: { pt: 1.5, pb: hasFooter ? 1.5 : 0 }, footer: { pt: 1.5 } }}
      isFullWidth
      px={2}
      pt={1.5}
      pb={hasFooter ? 1.5 : 2}>
      {{
        header: {
          title: (
            <Header
              avatar={author_details?.avatar_path || ''}
              name={author_details?.name || author || ''}
              username={author_details?.username || ''}
              date={created_at || ''}
            />
          ),
          actions: author_details?.rating ? (
            <Rating
              rating={{
                rating: author_details?.rating || null,
                count: null
              }}
              isLoading={isLoading}
              iconFontsize={iconFontsize}
              textFontsize={['lg', 'lg', 'xl', 'xl', 'xl', 'xl']}
            />
          ) : undefined
        },
        body: <Body content={content} isLoading={isLoading} />,
        footer:
          updated_at && !moment(updated_at).isSame(created_at) ? (
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
              {`* Updated on: ${moment(updated_at).format('LLL')}`}
            </Text>
          ) : undefined
      }}
    </Card>
  );
};

export default Review;
