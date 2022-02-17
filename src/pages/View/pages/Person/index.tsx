import { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, Fade } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import CountUp from 'react-countup';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { useSelector } from '../../../../common/hooks';
import axiosInstance from '../../../../common/scripts/axios';
import { ExternalIDs, Images } from '../../../../common/types';
import { FullPerson, Credits as CreditsType, MovieCredits, TVCredits } from '../../../../common/types/person';
import { handleReturnBoringTypeByMediaType } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import MediaViewer from '../../../../components/MediaViewer';
import Socials from '../../../../components/Socials';
import Tabs from '../../../../components/Tabs';
import TabList from '../../../../components/Tabs/components/TabList';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import { setRecentlyViewed } from '../../../../store/slices/User';
import Actions from '../../components/Actions';
import AssetsTab from '../../components/Assets';
import Structure from '../../components/Structure';
import { handleGetDepartments } from './common/utils';
import CreditsTab from './components/CreditsTab';
import OverviewTab from './components/OverviewTab';
import Title from './components/Title';

const Person = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const dispatch = useDispatch();
  const recentlyViewed = useSelector((state) => state.user.data.recentlyViewed);

  const color = useSelector((state) => state.user.ui.theme.color);

  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [selectedPath, setSelectedPath] = useState<string>();

  // Fetching person details
  const personQuery = useQuery(
    [`person-${id}`, id],
    async () => {
      const { data } = await axiosInstance.get<FullPerson>(`/person/${id}`, {
        cancelToken: source.token
      });
      return data;
    },
    {
      onSuccess: (person) => {
        dispatch(
          setRecentlyViewed({
            ...recentlyViewed,
            people: _.uniq([...recentlyViewed.people, { ...person }])
          })
        );
      }
    }
  );

  // Fetching person known for list
  const creditsQuery = useQuery([`person-${id}-combined_credits`, id], async () => {
    const { data } = await axiosInstance.get<CreditsType>(`/person/${id}/combined_credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person movie credits
  const movieCreditsQuery = useQuery([`person-${id}-movie_credits`, id], async () => {
    const { data } = await axiosInstance.get<MovieCredits>(`/person/${id}/movie_credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person tv credits
  const tvCreditsQuery = useQuery([`person-${id}-tv_credits`, id], async () => {
    const { data } = await axiosInstance.get<TVCredits>(`/person/${id}/tv_credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person external ids
  const externalIdsQuery = useQuery([`person-${id}-external_ids`, id], async () => {
    const { data } = await axiosInstance.get<ExternalIDs>(`/person/${id}/external_ids`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person images
  const imagesQuery = useQuery([`person-${id}-images`, id], async () => {
    const { data } = await axiosInstance.get<Images>(`/person/${id}/images`, {
      cancelToken: source.token
    });
    return data;
  });

  const handleChangeTab = (index: number): void => {
    setActiveTab(index);
    document.scrollingElement?.scrollTo(0, 0);
  };

  const handleOnAssetClick = (path: string): void => {
    setSelectedPath(path);
    onMediaViewerOpen();
  };

  const handleCheckLocation = (): void => {
    const hash = String(location.hash).replace('#', '');

    switch (hash) {
      case 'credits':
        setActiveTab(1);
        return;
      case 'photos':
        setActiveTab(2);
        return;
      default:
        setActiveTab(0);
        return;
    }
  };

  const departments =
    movieCreditsQuery.isSuccess && tvCreditsQuery.isSuccess
      ? handleGetDepartments(movieCreditsQuery.data, tvCreditsQuery.data)
      : [];

  useEffect(() => {
    handleCheckLocation();
  }, [location]);

  useEffect(() => {
    handleCheckLocation();

    return () => {
      source.cancel();

      setActiveTab(0);
    };
  }, []);

  return (
    <>
      <Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
        <Structure>
          {{
            title: (
              <Title
                person={personQuery.data}
                departments={departments.map((department) => department.label)}
                isLoading={personQuery.isFetching || personQuery.isLoading}
              />
            ),
            actions: (
              <Actions
                mediaItem={personQuery.data}
                mediaType='person'
                title={personQuery.data?.name}
                isLoading={personQuery.isFetching || personQuery.isLoading}
                isError={personQuery.isError}
              />
            ),
            tabList: (
              <TabList color={color}>
                {[
                  {
                    label: 'Overview'
                  },
                  {
                    label: 'Credits',
                    isDisabled:
                      creditsQuery.isError ||
                      creditsQuery.isFetching ||
                      creditsQuery.isLoading ||
                      (creditsQuery.data?.cast?.length || 0) + (creditsQuery.data?.crew?.length || 0) === 0,
                    renderRight:
                      (creditsQuery.data?.cast?.length || 0) + (creditsQuery.data?.crew?.length || 0) > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp
                                  duration={1}
                                  end={(creditsQuery.data?.cast?.length || 0) + (creditsQuery.data?.crew?.length || 0)}
                                />
                              </Badge>
                            </Fade>
                          )
                        : undefined
                  },
                  {
                    label: 'Photos',
                    isDisabled:
                      imagesQuery.isError ||
                      imagesQuery.isFetching ||
                      imagesQuery.isLoading ||
                      (imagesQuery.data?.profiles?.length || 0) === 0,
                    renderRight:
                      (imagesQuery.data?.profiles?.length || 0) > 0
                        ? ({ isSelected, size }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={size}>
                                <CountUp duration={1} end={imagesQuery.data?.profiles?.length || 0} />
                              </Badge>
                            </Fade>
                          )
                        : undefined
                  }
                ]}
              </TabList>
            ),
            socials: (
              <Socials
                alt={personQuery.data?.name}
                socials={{ ...externalIdsQuery.data, homepage_id: personQuery.data?.homepage }}
                orientation='horizontal'
                isLoading={
                  personQuery.isFetching ||
                  personQuery.isLoading ||
                  externalIdsQuery.isFetching ||
                  externalIdsQuery.isLoading
                }
              />
            ),
            tabPanels: (
              <TabPanels>
                <OverviewTab
                  person={personQuery.data}
                  credits={creditsQuery.data}
                  images={imagesQuery.data?.profiles}
                  isError={{
                    person: personQuery.isError,
                    credits: creditsQuery.isError,
                    images: imagesQuery.isError
                  }}
                  isSuccess={{
                    person: personQuery.isSuccess,
                    credits: creditsQuery.isSuccess,
                    images: imagesQuery.isSuccess
                  }}
                  isLoading={{
                    person: personQuery.isFetching || personQuery.isLoading,
                    credits: creditsQuery.isFetching || creditsQuery.isLoading,
                    images: imagesQuery.isFetching || imagesQuery.isLoading
                  }}
                  onClickImage={handleOnAssetClick}
                  onChangeTab={handleChangeTab}
                />
                <CreditsTab
                  departments={departments}
                  isError={movieCreditsQuery.isError || tvCreditsQuery.isError}
                  isSuccess={movieCreditsQuery.isSuccess && tvCreditsQuery.isSuccess}
                  isLoading={
                    movieCreditsQuery.isFetching ||
                    movieCreditsQuery.isLoading ||
                    tvCreditsQuery.isFetching ||
                    tvCreditsQuery.isLoading
                  }
                />
                <AssetsTab
                  alt={personQuery.data?.name}
                  assets={{ profiles: imagesQuery.data?.profiles }}
                  isError={imagesQuery.isError}
                  isSuccess={imagesQuery.isSuccess}
                  isLoading={imagesQuery.isFetching || imagesQuery.isLoading}
                  onClickAsset={handleOnAssetClick}
                />
              </TabPanels>
            )
          }}
        </Structure>
      </Tabs>

      {imagesQuery.isSuccess ? (
        <MediaViewer
          alt={personQuery.data?.name || 'Person Name'}
          assets={[
            {
              label: 'Photos',
              mediaItems: (imagesQuery.data?.profiles || []).map((image) => {
                return {
                  type: 'image',
                  boringType: handleReturnBoringTypeByMediaType('person'),
                  srcSize: ['w45', 'original'],
                  data: { ...image }
                };
              })
            }
          ]}
          selectedPath={selectedPath}
          isOpen={isMediaViewerOpen}
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default Person;
