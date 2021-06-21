import { SortBy } from '../types/types';

export const MovieTVSortBy: SortBy[] = [
  {
    label: 'Popularity',
    value: 'popularity',
    isActive: false
  },
  {
    label: 'Rating',
    value: 'vote_average',
    isActive: true
  },
  {
    label: 'Release Date',
    value: 'release_date',
    isActive: false
  },
  {
    label: 'Title',
    value: 'title',
    isActive: false
  }
];

export const PeopleSortBy: SortBy[] = [
  {
    label: 'Popularity',
    value: 'popularity',
    isActive: true
  },
  {
    label: 'Gender',
    value: 'gender',
    isActive: false
  },
  {
    label: 'Name',
    value: 'name',
    isActive: false
  }
];
