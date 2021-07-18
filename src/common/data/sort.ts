import { SortBy } from '../types/types';

export const likedListsSortBy: SortBy[] = [
  {
    label: 'Date Added',
    value: 'dateAdded',
    isActive: false
  }
];

export const movieSortBy: SortBy[] = [
  {
    label: 'Popularity',
    value: 'popularity',
    isActive: false
  },
  {
    label: 'Rating',
    value: 'vote_average',
    isActive: false
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

export const likedListsMovieSortBy: SortBy[] = [...movieSortBy, ...likedListsSortBy];

export const tvSortBy: SortBy[] = [
  {
    label: 'Popularity',
    value: 'popularity',
    isActive: false
  },
  {
    label: 'Rating',
    value: 'vote_average',
    isActive: false
  },
  {
    label: 'Release Date',
    value: 'first_air_date',
    isActive: false
  },
  {
    label: 'Title',
    value: 'name',
    isActive: false
  }
];

export const likedListsTvSortBy: SortBy[] = [...tvSortBy, ...likedListsSortBy];

export const peopleSortBy: SortBy[] = [
  {
    label: 'Popularity',
    value: 'popularity',
    isActive: false
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

export const likedListsPeopleSortBy: SortBy[] = [...peopleSortBy, ...likedListsSortBy];
