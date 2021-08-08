export type Breadcrumb = {
  label: string;
  consistsOf: string[];
};

export type RouteBreadcrumb = { [key: string]: Breadcrumb };

const breadcrumbs: RouteBreadcrumb = {
  '/': {
    label: 'Home',
    consistsOf: ['/']
  },
  '/liked': {
    label: 'Liked',
    consistsOf: ['/', '/liked']
  },
  '/liked/movie': {
    label: 'Movies',
    consistsOf: ['/', '/liked', '/liked/movie']
  },
  '/liked/tv': {
    label: 'TV Shows',
    consistsOf: ['/', '/liked', '/liked/tv']
  },
  '/liked/person': {
    label: 'People',
    consistsOf: ['/', '/liked', '/liked/person']
  },
  '/lists': {
    label: 'Lists',
    consistsOf: ['/', '/lists']
  },
  '/lists/:id': {
    label: 'List',
    consistsOf: ['/', '/lists', '/lists/:id']
  },
  '/lists/:id/:mediaType': {
    label: 'List',
    consistsOf: ['/', '/lists', '/lists/:id', '/lists/:id/:mediaType']
  },
  '/search': {
    label: 'Search',
    consistsOf: ['/', '/search']
  },
  '/trending': {
    label: 'Trending',
    consistsOf: ['/', '/trending']
  },
  '/trending/movie': {
    label: 'Movies',
    consistsOf: ['/', '/trending', '/trending/movie']
  },
  '/trending/tv': {
    label: 'TV Shows',
    consistsOf: ['/', '/trending', '/trending/tv']
  },
  '/trending/person': {
    label: 'People',
    consistsOf: ['/', '/trending', '/trending/person']
  },
  '/movies': {
    label: 'Movies',
    consistsOf: ['/', '/movies']
  },
  '/movies/popular': {
    label: 'Popular',
    consistsOf: ['/', '/movies', '/movies/popular']
  },
  '/movies/upcoming': {
    label: 'Upcoming',
    consistsOf: ['/', '/movies', '/movies/upcoming']
  },
  '/movies/now-playing': {
    label: 'Now playing',
    consistsOf: ['/', '/movies', '/movies/now-playing']
  },
  '/movies/top-rated': {
    label: 'Top rated',
    consistsOf: ['/', '/movies', '/movies/top-rated']
  },
  '/tv': {
    label: 'TV Shows',
    consistsOf: ['/', '/tv']
  },
  '/tv/popular': {
    label: 'Popular',
    consistsOf: ['/', '/tv', '/tv/popular']
  },
  '/tv/airing-today': {
    label: 'Airing today',
    consistsOf: ['/', '/tv', '/tv/airing-today']
  },
  '/tv/on-tv': {
    label: 'On at the moment',
    consistsOf: ['/', '/tv', '/tv/on-tv']
  },
  '/tv/top-rated': {
    label: 'Top rated',
    consistsOf: ['/', '/tv', '/tv/top-rated']
  },
  '/people': {
    label: 'People',
    consistsOf: ['/', '/people']
  },
  '/person/:id': {
    label: 'Person',
    consistsOf: ['/', '/people', '/person/:id']
  }
};

export default breadcrumbs;
