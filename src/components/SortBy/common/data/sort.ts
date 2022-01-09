import { SortBy } from '../../types';

const commonSortBy: SortBy[] = [
  {
    label: 'Popularity',
    value: 'popularity'
  },
  {
    label: 'Rating',
    value: 'vote_average'
  }
];

const movieSortBy: SortBy[] = [
  ...commonSortBy,
  {
    label: 'Release Date',
    value: 'release_date'
  },
  {
    label: 'Revenue',
    value: 'revenue'
  },
  {
    label: 'Title',
    value: 'title'
  },
  {
    label: 'Ratings Count',
    value: 'vote_count'
  }
];

const tvSortBy: SortBy[] = [
  ...commonSortBy,
  {
    label: 'Release Date',
    value: 'first_air_date'
  }
];

export { movieSortBy, tvSortBy };
