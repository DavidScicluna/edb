import React, { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, Fade } from '@chakra-ui/react';
import axios from 'axios';
import CountUp from 'react-countup';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../../../common/hooks';
import axiosInstance from '../../../../common/scripts/axios';
import { ExternalIDs, Images } from '../../../../common/types';
import { FullPerson, Credits as CreditsType, MovieCredits, TVCredits } from '../../../../common/types/person';
import Badge from '../../../../components/Badge';
import MediaViewer from '../../../../components/MediaViewer';
import Socials from '../../../../components/Socials';
import Tabs from '../../../../components/Tabs';
import TabList from '../../../../components/Tabs/components/TabList';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import Structure from '../../components/Structure';
import { handleGetDepartments } from './common/utils';
import Actions from './components/Actions';
import CreditsTab from './components/CreditsTab';
import OverviewTab from './components/OverviewTab';
import PhotosTab from './components/PhotosTab';
import Title from './components/Title';

const Person = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [selectedImagePath, setSelectedImagePath] = useState<string>();

  // Fetching person details
  const personQuery = useQuery([`person-${id}`, id], async () => {
    const { data } = await axiosInstance.get<FullPerson>(`/person/${id}`, {
      cancelToken: source.token
    });
    return data;
  });

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

  /**
   * This method will open the image passed in the media modal
   *
   * @param image - Image object
   */
  const handleOnImageClick = (path: string): void => {
    setSelectedImagePath(path || undefined);
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
  console.log(departments);

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
            actions: <Actions person={personQuery.data} isLoading={personQuery.isFetching || personQuery.isLoading} />,
            tabList: (
              <TabList
                renderTabs={[
                  {
                    label: 'Overview'
                  },
                  {
                    label: 'Credits',
                    isDisabled: creditsQuery.isError || creditsQuery.isFetching || creditsQuery.isLoading,
                    renderRightIcon:
                      (creditsQuery.data?.cast?.length || 0) + (creditsQuery.data?.crew?.length || 0) > 0
                        ? ({ isSelected, fontSize }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
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
                    isDisabled: imagesQuery.isError || imagesQuery.isFetching || imagesQuery.isLoading,
                    renderRightIcon:
                      (imagesQuery.data?.profiles?.length || 0) > 0
                        ? ({ isSelected, fontSize }) => (
                            <Fade in unmountOnExit>
                              <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
                                <CountUp duration={1} end={imagesQuery.data?.profiles?.length || 0} />
                              </Badge>
                            </Fade>
                          )
                        : undefined
                  }
                ]}
              />
            ),
            socials: (
              <Socials
                socials={externalIdsQuery.data}
                name={personQuery.data?.name}
                orientation='horizontal'
                isLoading={externalIdsQuery.isFetching || externalIdsQuery.isLoading}
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
                  onClickImage={handleOnImageClick}
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
                <PhotosTab
                  name={personQuery.data?.name}
                  images={imagesQuery.data?.profiles}
                  isError={imagesQuery.isError}
                  isSuccess={imagesQuery.isSuccess}
                  isLoading={imagesQuery.isFetching || imagesQuery.isLoading}
                  onClickImage={handleOnImageClick}
                />
              </TabPanels>
            )
          }}
        </Structure>
      </Tabs>

      {imagesQuery.isSuccess ? (
        <MediaViewer
          alt={personQuery.data?.name ? `"${personQuery.data.name}" photo` : 'Person Photo'}
          assets={[
            {
              label: 'Photos',
              mediaItems: (imagesQuery.data?.profiles || []).map((image) => {
                return {
                  type: 'image',
                  boringType: 'beam',
                  srcSize: ['w45', 'original'],
                  data: { ...image }
                };
              })
            }
          ]}
          selectedPath={selectedImagePath}
          isOpen={isMediaViewerOpen}
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default Person;
