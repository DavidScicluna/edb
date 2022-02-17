import { ReactElement } from 'react';
import CountUp from 'react-countup';

import { useTheme, HStack, Fade } from '@chakra-ui/react';

import {
  LibraryBooksOutlined as LibraryBooksOutlinedIcon,
  LibraryBooksTwoTone as LibraryBooksTwoToneIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PeopleAltTwoTone as PeopleAltTwoToneIcon,
  TheatersOutlined as TheatersOutlinedIcon,
  TheatersTwoTone as TheatersTwoToneIcon,
  TvOutlined as TvOutlinedIcon,
  TvTwoTone as TvTwoToneIcon,
  BusinessOutlined as BusinessOutlinedIcon,
  BusinessTwoTone as BusinessTwoToneIcon
} from '@material-ui/icons';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { MediaTypesHeaderProps } from './types';

import { useSelector } from '../../../../common/hooks';
import Badge from '../../../../components/Badge';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import Divider from '../../../../components/Divider';
import TabList from '../../../../components/Tabs/components/TabList';
import { Theme } from '../../../../theme/types';

const defaultMediaTypes: MediaTypesHeaderProps['mediaTypes'] = ['movie', 'tv', 'person', 'company', 'collection'];

const defaultTotal: MediaTypesHeaderProps['total'] = { movie: 0, tv: 0, person: 0, company: 0, collection: 0 };

const MediaTypesHeader = (props: MediaTypesHeaderProps): ReactElement => {
  const theme = useTheme<Theme>();

  const color = useSelector((state) => state.user.ui.theme.color);

  const [ref, { height }] = useElementSize();

  const { activeTab, mediaTypes = defaultMediaTypes, total = defaultTotal, renderActions } = props;

  return (
    <HStack
      ref={ref}
      width='100%'
      minHeight='43px' // Size of Actions since they might be un-rendered
      maxHeight='43px' // Size of Actions since they might be un-rendered
      spacing={2}
      divider={
        <Fade
          in={!_.isNil(activeTab)}
          unmountOnExit
          style={{ marginLeft: theme.space[2], marginRight: theme.space[2] }}
        >
          <Divider orientation='vertical' height={`${height}px`} />
        </Fade>
      }
    >
      <TabList color={color}>
        {_.compact([
          mediaTypes.includes('movie')
            ? {
                label: 'Movies',
                isDisabled: total.movie === 0,
                renderLeft: ({ isSelected, width, height }) =>
                  isSelected ? (
                    <TheatersTwoToneIcon style={{ width, height }} />
                  ) : (
                    <TheatersOutlinedIcon style={{ width, height }} />
                  ),
                renderRight:
                  (total.movie || 0) > 0
                    ? ({ isSelected, size }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                            <CountUp duration={1} end={total.movie || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined
              }
            : undefined,
          mediaTypes.includes('tv')
            ? {
                label: 'TV Shows',
                isDisabled: total.tv === 0,
                renderLeft: ({ isSelected, width, height }) =>
                  isSelected ? (
                    <TvTwoToneIcon style={{ width, height }} />
                  ) : (
                    <TvOutlinedIcon style={{ width, height }} />
                  ),
                renderRight:
                  (total.tv || 0) > 0
                    ? ({ isSelected, size }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                            <CountUp duration={1} end={total.tv || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined
              }
            : undefined,
          mediaTypes.includes('person')
            ? {
                label: 'People',
                isDisabled: total.person === 0,
                renderLeft: ({ isSelected, width, height }) =>
                  isSelected ? (
                    <PeopleAltTwoToneIcon style={{ width, height }} />
                  ) : (
                    <PeopleAltOutlinedIcon style={{ width, height }} />
                  ),
                renderRight:
                  (total.person || 0) > 0
                    ? ({ isSelected, size }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                            <CountUp duration={1} end={total.person || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined
              }
            : undefined,
          mediaTypes.includes('company')
            ? {
                label: 'Companies',
                isDisabled: total.company === 0,
                renderLeft: ({ isSelected, width, height }) =>
                  isSelected ? (
                    <BusinessTwoToneIcon style={{ width, height }} />
                  ) : (
                    <BusinessOutlinedIcon style={{ width, height }} />
                  ),
                renderRight:
                  (total.company || 0) > 0
                    ? ({ isSelected, size }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                            <CountUp duration={1} end={total.company || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined
              }
            : undefined,
          mediaTypes.includes('collection')
            ? {
                label: 'Collections',
                isDisabled: total.collection === 0,
                renderLeft: ({ isSelected, width, height }) =>
                  isSelected ? (
                    <LibraryBooksTwoToneIcon style={{ width, height }} />
                  ) : (
                    <LibraryBooksOutlinedIcon style={{ width, height }} />
                  ),
                renderRight:
                  (total.collection || 0) > 0
                    ? ({ isSelected, size }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                            <CountUp duration={1} end={total.collection || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined
              }
            : undefined
        ])}
      </TabList>

      {renderActions ? (
        <HStack spacing={2}>
          <Fade in={!_.isNil(activeTab)} unmountOnExit>
            <DisplayMode />
          </Fade>
          {renderActions ? renderActions() : null}
        </HStack>
      ) : (
        <Fade in={!_.isNil(activeTab)} unmountOnExit>
          <DisplayMode />
        </Fade>
      )}
    </HStack>
  );
};

export default MediaTypesHeader;
