import { Breadcrumb } from '../../types';

const home: Breadcrumb = {
  label: 'Home',
  to: { pathname: '/' }
};

const search = {
  label: 'Search',
  to: { pathname: '/search' }
};

const movies: Breadcrumb = {
  label: 'Movies',
  to: { pathname: '/movies' }
};

const tv: Breadcrumb = {
  label: 'TV Shows',
  to: { pathname: '/tv' }
};

const people: Breadcrumb = {
  label: 'People',
  to: { pathname: '/people' }
};

const liked = {
  label: 'Liked',
  to: { pathname: '/liked' }
};

const lists = {
  label: 'Lists',
  to: { pathname: '/lists' }
};

// '/trending': {
//   label: 'Trending',
//   consistsOf: ['/', '/trending']
// },
// '/trending/movie': {
//   label: 'Movies',
//   consistsOf: ['/', '/trending', '/trending/movie']
// },
// '/trending/tv': {
//   label: 'TV Shows',
//   consistsOf: ['/', '/trending', '/trending/tv']
// },
// '/trending/person': {
//   label: 'People',
//   consistsOf: ['/', '/trending', '/trending/person']
// },

// '/person/:id': {
//   label: 'Person',
//   consistsOf: ['/', '/people', '/person/:id']
// }

export { home, search, movies, tv, people, liked, lists };
