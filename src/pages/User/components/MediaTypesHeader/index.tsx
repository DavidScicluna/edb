import { ReactElement } from 'react';

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
import CountUp from 'react-countup';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../common/hooks';
import Badge from '../../../../components/Badge';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import Divider from '../../../../components/Divider';
import TabList from '../../../../components/Tabs/components/TabList';
import { Theme } from '../../../../theme/types';
import { MediaTypesHeaderProps } from './types';

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
      <TabList
        renderTabs={_.compact([
          mediaTypes.includes('movie')
            ? {
                renderLeftIcon: ({ isSelected, fontSize }) =>
                  isSelected ? (
                    <TheatersTwoToneIcon style={{ fontSize }} />
                  ) : (
                    <TheatersOutlinedIcon style={{ fontSize }} />
                  ),
                renderRightIcon:
                  (total.movie || 0) > 0
                    ? ({ isSelected, fontSize }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
                            <CountUp duration={1} end={total.movie || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined,
                label: 'Movies',
                isDisabled: total.movie === 0
              }
            : undefined,
          mediaTypes.includes('tv')
            ? {
                renderLeftIcon: ({ isSelected, fontSize }) =>
                  isSelected ? <TvTwoToneIcon style={{ fontSize }} /> : <TvOutlinedIcon style={{ fontSize }} />,
                renderRightIcon:
                  (total.tv || 0) > 0
                    ? ({ isSelected, fontSize }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
                            <CountUp duration={1} end={total.tv || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined,
                label: 'TV Shows',
                isDisabled: total.tv === 0
              }
            : undefined,
          mediaTypes.includes('person')
            ? {
                renderLeftIcon: ({ isSelected, fontSize }) =>
                  isSelected ? (
                    <PeopleAltTwoToneIcon style={{ fontSize }} />
                  ) : (
                    <PeopleAltOutlinedIcon style={{ fontSize }} />
                  ),
                renderRightIcon:
                  (total.person || 0) > 0
                    ? ({ isSelected, fontSize }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
                            <CountUp duration={1} end={total.person || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined,
                label: 'People',
                isDisabled: total.person === 0
              }
            : undefined,
          mediaTypes.includes('company')
            ? {
                renderLeftIcon: ({ isSelected, fontSize }) =>
                  isSelected ? (
                    <BusinessTwoToneIcon style={{ fontSize }} />
                  ) : (
                    <BusinessOutlinedIcon style={{ fontSize }} />
                  ),
                renderRightIcon:
                  (total.company || 0) > 0
                    ? ({ isSelected, fontSize }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
                            <CountUp duration={1} end={total.company || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined,
                label: 'Companies',
                isDisabled: total.company === 0
              }
            : undefined,
          mediaTypes.includes('collection')
            ? {
                renderLeftIcon: ({ isSelected, fontSize }) =>
                  isSelected ? (
                    <LibraryBooksTwoToneIcon style={{ fontSize }} />
                  ) : (
                    <LibraryBooksOutlinedIcon style={{ fontSize }} />
                  ),
                renderRightIcon:
                  (total.collection || 0) > 0
                    ? ({ isSelected, fontSize }) => (
                        <Fade in unmountOnExit>
                          <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
                            <CountUp duration={1} end={total.collection || 0} />
                          </Badge>
                        </Fade>
                      )
                    : undefined,
                label: 'Collections',
                isDisabled: total.collection === 0
              }
            : undefined
        ])}
      />

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
